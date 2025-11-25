import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./src/auth/passport.config.js";
import routes from "./src/routes/index.js";

dotenv.config();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:4321",
  credentials: true,
  optionsSuccessStatus: 200,
};

const corsMiddleware = cors(corsOptions);

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello form Server");
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
