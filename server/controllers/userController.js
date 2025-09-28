import prisma from "../DB/db.config.js";

// Implement a set of function in seperate file and use bcryptjs to handle password validation and other operations
function verifyPassword(old, newp) {
  if (old == newp) {
    return true;
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      res.json({ status: 400, message: "Email already taken" });
    }

    const data = await prisma.user.create({
      data: {
        name,
        email,
        password, // Hash needed
        role,
      },
    });

    res.send({ message: "User Created Sucessfully", data: data }); // Remove data in production
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    let { getEmail, getPassword } = req.body;

    const checkDetil = await prisma.user.findUnique({
      where: {
        email: getEmail,
      },
    });

    if (!checkDetil) {
      res.send({ message: "Invalid credential" });
    }

    const checkPassword = await verifyPassword(
      getPassword,
      checkDetil.password,
    );

    if (!checkPassword) {
      res.send({ message: "Invalid credential" });
    }

    res.send({ message: "Sucessful" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { newName, email, newPassword, newRole } = req.body;

    const checkDetil = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkDetil) {
      res.send({ message: "Invalid credential" });
    }

    const data = await prisma.user.update({
      where: {
        id: checkDetil.id,
      },

      data: {
        name: newName,
        password: newPassword, // Hash needed
        role: newRole,
      },
    });

    res.send({ message: "User updated", data: data });
  } catch (error) {
    res.send({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await prisma.user.delete({ where: { email } });
    if (!result) {
      res.send({ message: "Invalid User" });
    }
    res.send({ message: "User Deleted Sucessfully" });
  } catch (error) {
    res.send({ message: "Internal Server Error" });
  }
};
