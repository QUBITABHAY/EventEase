import express from "express";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello form Server");
});

import routes from "./routes/index.js";
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
