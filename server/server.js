import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello form Server");
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
