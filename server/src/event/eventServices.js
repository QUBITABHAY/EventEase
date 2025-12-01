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
        title: title,
        description: description,
        longDescription: longDescription,
        category: category,
        date: date,
        startTime: startTime,
        endTime: endTime,
        venue: venue,
        posterUrl: posterUrl,
        price: price,
        prizePool: prizePool,
        prizeDescription: prizeDescription,
        capacity: capacity,
        organizer: {
          connect: {
            id: organizer,
          },
        },
      },
    });

    return { status: 201, message: "Event Created", event: createEvent };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getAllEventService = async (data) => {
  try {
    const page = parseInt(data?.page) || 1;
    const limit = parseInt(data?.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, category, date, venue, upcoming } = data;

    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category && category !== "Category") {
      where.category = category;
    }

    if (venue && venue !== "Location") {
      where.venue = venue;
    }

    if (date) {
      const searchDate = new Date(date);
      const nextDate = new Date(searchDate);
      nextDate.setDate(searchDate.getDate() + 1);

      where.date = {
        gte: searchDate,
        lt: nextDate,
      };
    }

    if (upcoming === 'true') {
      where.startTime = {
        gte: new Date(),
      };
    }

    const [allEvent, totalCount] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: upcoming === 'true' ? { startTime: "asc" } : { createdAt: "desc" },
      }),
      prisma.event.count({ where }),
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
        publicId: id,
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

    return {
      status: 200,
      message: "Event updated successfully",
      event: updateEvent,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getEventByIdService = async (publicId) => {
  try {
    const event = await prisma.event.findUnique({
      where: { publicId },
      include: {
        organizer: true,
      },
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
