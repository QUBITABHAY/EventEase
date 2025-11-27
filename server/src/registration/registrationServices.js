import prisma from "../DB/db.config.js";

export const createRegistrationService = async (data) => {
    try {
        const newRegistration = await prisma.registration.create({
            data,
        });
        return {
            status: 201,
            message: "Registration successful",
            registration: newRegistration,
        };
    } catch (error) {
        console.log(error);
        return { status: 500, message: "Internal Server Error" };
    }
};
