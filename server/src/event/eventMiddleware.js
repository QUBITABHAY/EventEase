export const createEventValidation = async (req, res, next) => {
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
    capacity,
    organizer,
  } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res
      .status(400)
      .json({ message: "Title is required and must be a non-empty string" });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length === 0
  ) {
    return res
      .status(400)
      .json({
        message: "Description is required and must be a non-empty string",
      });
  }

  if (
    !category ||
    typeof category !== "string" ||
    category.trim().length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Category is required and must be a non-empty string" });
  }

  if (!venue || typeof venue !== "string" || venue.trim().length === 0) {
    return res
      .status(400)
      .json({ message: "Venue is required and must be a non-empty string" });
  }

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const eventDate = new Date(date);
  if (isNaN(eventDate.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  if (eventDate < new Date()) {
    return res
      .status(400)
      .json({ message: "Event date cannot be in the past" });
  }

  if (!startTime) {
    return res.status(400).json({ message: "Start time is required" });
  }

  const eventStartTime = new Date(startTime);
  if (isNaN(eventStartTime.getTime())) {
    return res.status(400).json({ message: "Invalid start time format" });
  }

  if (!endTime) {
    return res.status(400).json({ message: "End time is required" });
  }

  const eventEndTime = new Date(endTime);
  if (isNaN(eventEndTime.getTime())) {
    return res.status(400).json({ message: "Invalid end time format" });
  }

  if (eventEndTime <= eventStartTime) {
    return res
      .status(400)
      .json({ message: "End time must be after start time" });
  }

  if (capacity === undefined || capacity === null) {
    return res.status(400).json({ message: "Capacity is required" });
  }

  const capacityNum = parseInt(capacity);
  if (isNaN(capacityNum) || capacityNum < 1) {
    return res
      .status(400)
      .json({ message: "Capacity must be a positive number" });
  }

  if (title.length > 200) {
    return res
      .status(400)
      .json({ message: "Title cannot exceed 200 characters" });
  }

  if (description.length > 500) {
    return res
      .status(400)
      .json({ message: "Description cannot exceed 500 characters" });
  }

  if (longDescription && longDescription.length > 5000) {
    return res
      .status(400)
      .json({ message: "Long description cannot exceed 5000 characters" });
  }

  if (price !== undefined && price !== null) {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a non-negative number" });
    }
  }

  if (prizePool !== undefined && prizePool !== null) {
    const prizePoolNum = parseFloat(prizePool);
    if (isNaN(prizePoolNum) || prizePoolNum < 0) {
      return res
        .status(400)
        .json({ message: "Prize pool must be a non-negative number" });
    }
  }

  if (posterUrl && typeof posterUrl !== "string") {
    return res.status(400).json({ message: "Poster URL must be a string" });
  }

  if (organizer && typeof organizer !== "string") {
    return res.status(400).json({ message: "Organizer must be a string" });
  }

  next();
};

export const updateEventValidation = async (req, res, next) => {
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
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  const eventId = parseInt(id);
  if (isNaN(eventId) || eventId < 1) {
    return res
      .status(400)
      .json({ message: "Event ID must be a positive number" });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Title must be a non-empty string" });
    }
    if (title.length > 200) {
      return res
        .status(400)
        .json({ message: "Title cannot exceed 200 characters" });
    }
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Description must be a non-empty string" });
    }
    if (description.length > 500) {
      return res
        .status(400)
        .json({ message: "Description cannot exceed 500 characters" });
    }
  }

  if (longDescription !== undefined && longDescription !== null) {
    if (typeof longDescription !== "string") {
      return res
        .status(400)
        .json({ message: "Long description must be a string" });
    }
    if (longDescription.length > 5000) {
      return res
        .status(400)
        .json({ message: "Long description cannot exceed 5000 characters" });
    }
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Category must be a non-empty string" });
    }
  }

  if (venue !== undefined) {
    if (typeof venue !== "string" || venue.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Venue must be a non-empty string" });
    }
  }

  if (date !== undefined) {
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    if (eventDate < new Date()) {
      return res
        .status(400)
        .json({ message: "Event date cannot be in the past" });
    }
  }

  if (startTime !== undefined) {
    const eventStartTime = new Date(startTime);
    if (isNaN(eventStartTime.getTime())) {
      return res.status(400).json({ message: "Invalid start time format" });
    }
  }

  if (endTime !== undefined) {
    const eventEndTime = new Date(endTime);
    if (isNaN(eventEndTime.getTime())) {
      return res.status(400).json({ message: "Invalid end time format" });
    }
  }

  if (startTime !== undefined && endTime !== undefined) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (end <= start) {
      return res
        .status(400)
        .json({ message: "End time must be after start time" });
    }
  }

  if (capacity !== undefined && capacity !== null) {
    const capacityNum = parseInt(capacity);
    if (isNaN(capacityNum) || capacityNum < 1) {
      return res
        .status(400)
        .json({ message: "Capacity must be a positive number" });
    }
  }

  if (prizeDescription !== undefined && prizeDescription !== null) {
    if (typeof prizeDescription !== "string") {
      return res
        .status(400)
        .json({ message: "Prize description must be a string" });
    }
    if (prizeDescription.length > 1000) {
      return res
        .status(400)
        .json({ message: "Prize description cannot exceed 1000 characters" });
    }
  }

  if (
    posterUrl !== undefined &&
    posterUrl !== null &&
    typeof posterUrl !== "string"
  ) {
    return res.status(400).json({ message: "Poster URL must be a string" });
  }

  next();
};
