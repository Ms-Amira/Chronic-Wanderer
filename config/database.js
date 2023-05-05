const mongoose = require("mongoose");


//change capstone to the name of my project
mongoose.connect('mongodb://127.0.0.1:27017/capstone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});



