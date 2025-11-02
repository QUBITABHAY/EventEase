import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:4321",
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

app.get("/", (req, res) => {
  res.send("Hello form Server");
});

import routes from "./routes/index.js";
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
