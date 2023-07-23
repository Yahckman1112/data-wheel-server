const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users= require('./routes/users')

app.get("/", (req, res) => {
  res.send("app started");
});


app.use(express.json())
app.use('/api/users', users)





mongoose
  .connect("mongodb://127.0.0.1:27017/data-wheel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to MongoDB"))
  .catch((err) => console.log("Could not connect", err));




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
