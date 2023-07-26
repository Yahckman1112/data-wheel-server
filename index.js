const express = require("express");
const app = express();
const multer = require('multer');


const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const news = require("./routes/news");
const images= require('./routes/image')
const category = require('./routes/category')
const fruits = require('./routes/fruiits')
const config = require('./config/default.json')




app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

// app.use(express.)
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/news", news);
app.use("/api/images", images);
app.use("/api/category", category);
app.use("/api/fruits", fruits);



const db = config.db

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to MongoDB"))
  .catch((err) => console.log("Could not connect", err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
