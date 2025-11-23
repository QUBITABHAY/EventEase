import prisma from "../DB/db.config.js";
import bcrypt from "bcryptjs";
import redis from "../DB/redis.config.js";
import { otpGenerator } from "../utils/otpGenerator.js";
import { sendEmail } from "../utils/sendEmail.js";

export const localSignupService = async (data) => {
  try {
    const { email, password } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { status: 400, message: "Email already registered" };
    }

    const otp = otpGenerator();
    const hashedPassword = await bcrypt.hash(password, 10);

    await redis.set(
      `otp:${email}`,
      JSON.stringify({
        hashedPassword,
        otp,
      }),
      "EX",
      600,
    );

    const subject = "EventEase - OTP Verification";
    const text = `Your OTP for EventEase registration is: ${otp}`;

    await sendEmail(email, subject, text);

    return {
      status: 200,
      message: "OTP sent. Please verify to complete registration.",
    };
  } catch (error) {
    console.error("Local signup service error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const verifyOtpService = async (data) => {
  try {
    const { email, otp } = data;

    const storedData = await redis.get(`otp:${email}`);

    if (!storedData) {
      return { status: 400, message: "Invalid OTP" };
    }

    const { hashedPassword, otp: correctOtp } = JSON.parse(storedData);

    if (otp != correctOtp) {
      return { status: 400, message: "Invalid OTP" };
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        provider: "LOCAL",
        isProfileComplete: false,
      },
    });

    await redis.del(`otp:${email}`);

    return {
      status: 201,
      message: "User registered successfully",
      user: newUser,
    };
  } catch (error) {
    console.error("Verify OTP service error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const completeProfileService = async (data) => {
  try {
    const { userId, firstName, lastName, phone, role } = data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    if (user.isProfileComplete) {
      return { status: 400, message: "Profile already completed" };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone: phone || null,
        role: role || "USER",
        isProfileComplete: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
      },
    });

    return {
      status: 200,
      message: "Profile completed successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error("Complete profile service error:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("phone")) {
      return { status: 400, message: "Phone number already in use" };
    }

    return { status: 500, message: "Internal Server Error" };
  }
};

export const localLoginService = async (data) => {
  try {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { status: 401, message: "Invalid email or password" };
    }

    if (user.provider !== "LOCAL") {
      return {
        status: 400,
        message: `This account uses ${user.provider} login. Please use "Continue with ${user.provider}" button.`,
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 401, message: "Invalid email or password" };
    }

    if (!user.isProfileComplete) {
      return {
        status: 403,
        message: "Please complete your profile to continue",
        requiresProfile: true,
        user: { id: user.id, email: user.email },
      };
    }

    return {
      status: 200,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Local login service error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};
