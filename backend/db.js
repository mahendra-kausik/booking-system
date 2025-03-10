const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/bookings"; 

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
    console.log("Mongo DB connection failed!");
});

connection.on("connected", () => {
    console.log("Mongo DB connection successful!");
});

module.exports = mongoose;
