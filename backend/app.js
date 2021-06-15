const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const indexRouter = require("./routes/index");
const testsRouter = require("./routes/tests");
const loginRouter = require("./routes/login");
const studentLoginRouter = require("./routes/studenLogin");
const studentTestsRouter = require("./routes/studentTests");
const studentGradesRouter = require("./routes/studentGrades");

require("dotenv").config();

const app = express();
app.use(express.json());
var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
const dir = path.join(__dirname, "public");
app.use(express.static(dir));

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

app.use("/", indexRouter);
app.use("/tests", testsRouter);
app.use("/login", loginRouter);
app.use("/student/login", studentLoginRouter);
app.use("/student/tests", studentTestsRouter);
app.use("/student/grades", studentGradesRouter);

app.listen(port);

module.exports = app;
