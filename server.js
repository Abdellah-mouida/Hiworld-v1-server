require("dotenv").config();

let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");

let app = express();
let indexRouter = require("./routes/index");
let singRouter = require("./routes/sing");
let loginRouter = require("./routes/login");
let postsRouter = require("./routes/posts");
let userRouter = require("./routes/user");
let validateRouter = require("./routes/validate");
let commentsRouter = require("./routes/comments");
let chatRouter = require("./routes/chat");

let PORT = process.env.PORT || 8000;
let mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);
let db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected To DataBase"));

app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));
// app.use(bodyParser.json({ limit: "15mb" }));
app.use(express.json({ limit: "15mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Enable CORS

app.use("/", indexRouter);
app.use("/sing", singRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/comments", commentsRouter);
app.use("/validate", validateRouter);
app.use("/chat", chatRouter);

app.listen(PORT);
