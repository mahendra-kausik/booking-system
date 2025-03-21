require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const port = 4000;

const dbConfig = require("./db");


const courtsRoute = require("./routes/courtsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());

app.use("/api/courts", courtsRoute); //const courtModel = mongoose.model("court", courtSchema);

app.use("/api/users", usersRoute); //const userModel = mongoose.model("user", userSchema);

app.use("/api/bookings", bookingsRoute); //const bookingModel = mongoose.model("booking", bookingSchema);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

