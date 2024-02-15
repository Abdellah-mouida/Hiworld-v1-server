require("dotenv").config();

let expres = require("express");
let cors = require("cors");

let app = expres();
let indexRouter = require("./routes/index");
let singRouter = require("./routes/sing");
let loginRouter = require("./routes/login");

let PORT = process.env.PORT || 8000;
let mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);
let db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected To DataBase"));

app.use(expres.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/", indexRouter);
app.use("/sing", singRouter);
app.use("/login", loginRouter);

app.listen(PORT);
