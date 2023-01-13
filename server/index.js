require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload')
const userRouter = require("./routers/userRouter"); 
const postRouter = require('./routers/postRouter')
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny")); 

app.use(
  cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.get("/api/", (req, res) => {
  res.send("Happy Hacking!").end();
});
app.use("/user", userRouter); 

app.use('/api',postRouter) ;

const URI =
  "mongodb+srv://athaana:1234@cluster0.4rzb2.mongodb.net/TestAthaana?retryWrites=true&w=majority";

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

app.listen(5000, console.log("Listening on port: 5000"));
