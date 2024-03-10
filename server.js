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

// Set Mongoose connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Enable SSL/TLS
  sslValidate: true, // Enable SSL validation
};

const URI =
  "mongodb+srv://Abdellah:WVWMcDdM4pr89SZV@abdellah.bwey2wf.mongodb.net/?retryWrites=true&w=majority&appName=Abdellah";
// Connect to MongoDB using Mongoose
mongoose
  .connect(URI, options)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start your application logic here
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

let db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected To DataBase"));

app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));
// app.use(bodyParser.json({ limit: "15mb" }));
app.use(express.json({ limit: "15mb" }));
app.use(cors());
// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRouter);
app.use("/sing", singRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/comments", commentsRouter);
app.use("/validate", validateRouter);
app.use("/chat", chatRouter);

app.listen(PORT);
