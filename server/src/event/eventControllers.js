import {
  createEventService,
  getAllEventService,
  updateEventService,
  getEventByIdService,
} from "./eventServices.js";

export const createEvent = async (req, res) => {
  try {
    const data = req.body;
    const result = await createEventService(data);

    return res.status(result?.status || 500).json({
      message: result?.message || "Internal Server Error",
      event: result?.event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const { page, limit, search, category, date, venue } = req.query;
    const result = await getAllEventService({ page, limit, search, category, date, venue });

    return res.status(result?.status || 500).json({
      events: result?.events || [],
      pagination: result?.pagination,
      message: result?.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const data = req.body;
    const result = await updateEventService(data);

    return res.status(result?.status || 500).json({
      message: result?.message || "Internal Server Error",
      event: result?.event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getEventByIdService(id);

    return res.status(result?.status || 500).json({
      message: result?.message,
      event: result?.event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
