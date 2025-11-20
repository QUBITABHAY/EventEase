import prisma from "../DB/db.config.js";

export const createEventService = async (data) => {
  try {
    const {
      title,
      description,
      longDescription,
      category,
      date,
      startTime,
      endTime,
      venue,
      posterUrl,
      price,
      prizePool,
      prizeDescription,
      capacity,
      organizer,
    } = data;

    const createEvent = await prisma.event.create({
      data: {
        title,
        description,
        longDescription,
        category,
        date,
        startTime,
        endTime,
        venue,
        posterUrl,
        price,
        prizePool,
        prizeDescription,
        capacity,
        organizer,
      },
    });

    return { status: 201, message: "Event Created", event: createEvent };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export const getAllEventService = async (data) => {
  try {
    const page = parseInt(data?.page) || 1;
    const limit = parseInt(data?.limit) || 10;
    const skip = (page - 1) * limit;

    const [allEvent, totalCount] = await Promise.all([
      prisma.event.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.event.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      status: 200,
      events: allEvent,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const updateEventService = async (data) => {
  try {
    const {
      id,
      description,
      longDescription,
      category,
      date,
      startTime,
      endTime,
      venue,
      posterUrl,
      prizeDescription,
      capacity,
    } = data;

    const updateEvent = await prisma.event.update({
      where: {
        id,
      },

      data: {
        description,
        longDescription,
        category,
        date,
        startTime,
        endTime,
        venue,
        posterUrl,
        prizeDescription,
        capacity,
      },
    });

    return { status: 200, message: "Event updated successfully", event: updateEvent };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getEventByIdService = async (id) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      return { status: 404, message: "Event not found" };
    }
    return { status: 200, event };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
