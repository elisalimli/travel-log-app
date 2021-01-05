const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
const middlewares = require("./middlewares");
const logs = require("./routes/logs");
const users = require("./routes/users");

//Middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/logs", logs);
app.use("/api/user", users);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
