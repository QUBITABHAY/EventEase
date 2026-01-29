import prisma from "../DB/db.config.js";
import bcrypt from "bcryptjs";

export const createUserService = async (data) => {
  try {
    const { firstName, lastName, email, password, phone, role } = data;

    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    if (findUser) {
      return { status: 400, message: "User already exists" };
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const created = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashpassword,
        phone,
        role: role ? role.toUpperCase() : "USER",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    return { status: 201, message: "User created", user: created };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const loginUserService = async (data) => {
  try {
    let { email, password } = data;

    const checkDetail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkDetail) {
      return { status: 401, message: "Invalid credentials" };
    }

    const checkPassword = await bcrypt.compare(password, checkDetail.password);

    if (!checkPassword) {
      return { status: 401, message: "Invalid credentials" };
    }

    return {
      status: 200,
      message: "Login successful",
      user: {
        id: checkDetail.id,
        email: checkDetail.email,
        role: checkDetail.role,
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getCurrentUserService = async (data) => {
  try {
    const decoded = data;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    return {
      status: 200,
      data: user,
    };
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return {
        status: 401,
        message: "Invalid token",
      };
    }
    if (error.name === "TokenExpiredError") {
      return {
        status: 401,
        message: "Token has expired",
      };
    }
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const updateUserService = async (data) => {
  try {
    const { firstName, lastName, email, phone, newPassword, newRole } = data;

    const checkDetail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkDetail) {
      return {
        status: 401,
        message: "Invalid credential",
      };
    }

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (newPassword) updateData.password = await bcrypt.hash(newPassword, 10);
    if (newRole) updateData.role = newRole;

    const updatedUser = await prisma.user.update({
      where: {
        id: checkDetail.id,
      },
      data: updateData,
    });

    return {
      status: 200,
      message: "User updated",
      data: updatedUser,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const deleteUserService = async (data) => {
  try {
    const { email, password } = data;

    const checkDetail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkDetail) {
      return { status: 401, message: "Invalid credential" };
    }

    const checkPassword = await bcrypt.compare(password, checkDetail.password);

    if (!checkPassword) {
      return { status: 401, message: "Invalid credential" };
    }

    const result = await prisma.user.delete({ where: { email } });

    if (!result) {
      return { status: 400, message: "Unable to delete user" };
    }

    return { status: 200, message: "User Deleted Successfully" };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
};

export const logoutUserService = async () => {
  try {
    return { status: 200, message: "Logged out successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const resetPasswordService = async (data) => {
  try {
    const { email, password } = data;

    const checkDetail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkDetail) {
      return { status: 401, message: "User not found" };
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: checkDetail.id,
      },
      data: {
        password: hashpassword,
      },
    });

    return { status: 200, message: "Password reset successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
