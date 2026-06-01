const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

app.disable("x-powered-by");
app.set("trust proxy", true);

const ensureDataFiles = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(BOOKINGS_FILE);
  } catch {
    await fs.writeFile(BOOKINGS_FILE, "[]", "utf8");
  }
  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    await fs.writeFile(MESSAGES_FILE, "[]", "utf8");
  }
};

const readJson = async (filePath) => {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw || "[]");
};

const writeJson = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
};

const sanitizeText = (text) => {
  if (typeof text !== "string") return "";
  return text
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, 1000);
};

const normalizeBooking = (body) => ({
  fullName: sanitizeText(body.fullName),
  phone: sanitizeText(body.phone),
  email: sanitizeText(body.email),
  service: sanitizeText(body.service),
  barber: sanitizeText(body.barber),
  date: sanitizeText(body.date),
  time: sanitizeText(body.time),
  notes: sanitizeText(body.notes),
  createdAt: new Date().toISOString(),
});

const normalizeMessage = (body) => ({
  fullName: sanitizeText(body.fullName),
  email: sanitizeText(body.email),
  phone: sanitizeText(body.phone),
  subject: sanitizeText(body.subject),
  message: sanitizeText(body.message),
  createdAt: new Date().toISOString(),
});

const validateBooking = (booking) => {
  const errors = [];
  if (!booking.fullName) errors.push("Full name is required.");
  if (!booking.phone) errors.push("Phone number is required.");
  if (!booking.service) errors.push("Service selection is required.");
  if (!booking.date) errors.push("Preferred date is required.");
  if (!booking.time) errors.push("Preferred time is required.");
  return errors;
};

const validateMessage = (message) => {
  const errors = [];
  if (!message.fullName) errors.push("Full name is required.");
  if (!message.email) errors.push("Email address is required.");
  if (!message.subject) errors.push("Subject is required.");
  if (!message.message) errors.push("Message is required.");
  return errors;
};

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "20kb" }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
  }),
);

app.use(express.static(path.join(__dirname)));

app.post("/api/bookings", async (req, res) => {
  try {
    const booking = normalizeBooking(req.body || {});
    const errors = validateBooking(booking);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(" ") });
    }

    const bookings = await readJson(BOOKINGS_FILE);
    bookings.push(booking);
    await writeJson(BOOKINGS_FILE, bookings);

    return res.status(201).json({ message: "Booking received successfully." });
  } catch (error) {
    console.error("Booking save error:", error);
    return res
      .status(500)
      .json({ message: "Unable to save booking. Please try again later." });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const message = normalizeMessage(req.body || {});
    const errors = validateMessage(message);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(" ") });
    }

    const messages = await readJson(MESSAGES_FILE);
    messages.push(message);
    await writeJson(MESSAGES_FILE, messages);

    return res.status(201).json({ message: "Message received successfully." });
  } catch (error) {
    console.error("Message save error:", error);
    return res
      .status(500)
      .json({ message: "Unable to save message. Please try again later." });
  }
});

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await readJson(BOOKINGS_FILE);
    res.json(bookings);
  } catch (error) {
    console.error("Bookings read error:", error);
    res.status(500).json({ message: "Unable to read bookings." });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await readJson(MESSAGES_FILE);
    res.json(messages);
  } catch (error) {
    console.error("Messages read error:", error);
    res.status(500).json({ message: "Unable to read messages." });
  }
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: "Internal server error." });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

ensureDataFiles()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to start server:", error);
    process.exit(1);
  });
