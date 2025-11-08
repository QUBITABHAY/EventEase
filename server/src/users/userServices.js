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
      select: { id: true, firstName: true, lastName: true, email: true, role: true },
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

    const checkDetil = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkDetil) {
      return { status: 401, message: "Invalid credentials" };
    }

    const checkPassword = await bcrypt.compare(password, checkDetil.password);

    if (!checkPassword) {
      return { status: 401, message: "Invalid credentials" };
    }

    return {
      status: 200,
      message: "Login successful",
      user: { id: checkDetil.id, email: checkDetil.email, role: checkDetil.role },
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
      data: user 
    };
  } catch (error) {
    // Development log
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return {
        status: 401,
        message: "Invalid token"
      };
    }
    if (error.name === "TokenExpiredError") {
      return {
        status: 401,
        message: "Token has expired"
      };
    }
    return {
      status: 500,
      message: "Internal Server Error"
    };
  }
};

export const updateUserService = async (data) => {
  try {
    const { newName, email, newPassword, newRole } = data;

    const checkDetil = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkDetil) {
      return {
        status: 401,
        message: "Invalid credential"
      };
    }

    const data = await prisma.user.update({
      where: {
        id: checkDetil.id,
      },

      data: {
        name: newName,
        password: await bcrypt.hash(newPassword, 10),
        role: newRole,
      },
    });

    return {
      status: 200,
      message: "User updated",
      data: data
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error"
    };
  }
};

export const deleteUserService = async (data) => {
  try {
    const { email, password } = data;

    const checkDetil = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkDetil) {
      return { status: 401, message: "Invalid credential" };
    }

    const checkPassword = await bcrypt.compare(password, checkDetil.password);

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