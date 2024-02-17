require("dotenv").config();

let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");

let app = express();
let indexRouter = require("./routes/index");
let singRouter = require("./routes/sing");
let loginRouter = require("./routes/login");
let postsRouter = require("./routes/posts");

let PORT = process.env.PORT || 8000;
let mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);
let db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected To DataBase"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "15mb" }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/", indexRouter);
app.use("/sing", singRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);

app.listen(PORT);
