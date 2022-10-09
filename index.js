require("dotenv").config();
const express = require("express");
const compression = require("compression");
const { notFound, error } = require("./src/middlewares/error.middleware");
const activity = require("./src/routes/activity.routes");
const todo = require("./src/routes/todo.routes");
const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use("/activity-groups", activity);
app.use("/todo-items", todo);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hallo, nice to meet you",
  });
});

app.use("*", notFound);
app.use(error);

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
