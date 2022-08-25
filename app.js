const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const cors = require('cors');
const logger = require("./logger");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/user");
app.get("/", (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if(err) {
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});
app.use("/api", postRoutes);
app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({error: "invalid token..."});
  }
});
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB connected");
  });

mongoose.connection.on("error", err => {
  console.log("DB connection error:" + err.message);
});
const port = process.env.PORT || 8001;
app.listen(port, () => {
  // logger.info(`Node api running... on port ${port}`, {meta1: "meta11"});
  logger.warn("warning log");
  // logger.error("Error log");
  // logger.error(new Error("Something went wrong."));
});

// mongoose
//   .connect("mongodb://localhost/blogpost", { useNewUrlParser: true })
//   .then(() => {
//     console.log("DB connected");
//   });
// mongoose.connection.on("error", (err) => {
//   console.log("DB connection error:" + err.message);
// });
// const port = process.env.PORT || 8001;
// app.listen(port, () => {
//   // logger.info(`Node api running... on port ${port}`, {meta1: "meta11"});
//   logger.warn("warning log");
//   // logger.error("Error log");
//   // logger.error(new Error("Something went wrong."));
// });
//babel