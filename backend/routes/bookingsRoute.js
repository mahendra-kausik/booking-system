require('dotenv').config();

const express = require('express');
const router = express.Router();

const Booking = require("../models/booking");
const Court = require("../models/court");

function generateTransactionId() {
    let transactionId = '';
    for (let i = 0; i < 20; i++) {
        transactionId += Math.floor(Math.random() * 10);
    }
    return transactionId;
}

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();

        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching bookings', error: err });
    }
};

router.post("/bookingCourt", async (req, res) => {
    const {
        court,
        userId,
        startDate,
        endDate,
        maxPlayers,
        totalHours,
        totalAmount,
    } = req.body;

    try {
        if (totalHours > 2) {
            return res.status(400).json({
                message: "Booking duration cannot exceed 2 hours.",
            });
        }

        const newBooking = new Booking({
            court: court.name,
            courtId: court._id,
            userId,
            startDate,
            endDate,
            maxPlayers,
            totalHours,
            totalAmount,
            transactionId: generateTransactionId(),
        });

        const savedBooking = await newBooking.save();

        const findBooking = await Court.findOne({ _id: court._id });

        findBooking.currentBookings.push({
            bookingId: savedBooking._id,
            startDate: startDate,
            endDate: endDate,
            userId: savedBooking.userId,
            status: savedBooking.status,
        });

        await findBooking.save();

        return res.send("Payment Successful, your booking has been confirmed");
    } catch (error) {
        console.error("Error in bookingCourt:", error);
        return res.status(400).json({ message: error.message });
    }
});

router.post("/getBookingsByUserId", async (req, res) => {
    const { userId } = req.body;

    try {
        const bookings = await Booking.find({ userId });
        
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        res.send(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Error fetching bookings", error });
    }
});

router.post("/cancelBooking", async (req, res) => {
    const { bookingId, courtId } = req.body;

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = 'Cancelled';
        await booking.save();

        // Find the court and remove the booking from its list of current bookings
        const court = await Court.findById(courtId);
        if (!court) {
            return res.status(404).json({ message: "Court not found" });
        }

        court.currentBookings = court.currentBookings.filter(
            (booking) => booking.bookingId.toString() !== bookingId
        );
        await court.save();

        res.send({ message: "Booking cancelled successfully" });
    } catch (error) {
        console.error("Error canceling booking:", error);
        res.status(500).json({ message: "Error canceling booking", error });
    }
});

router.get('/getAllBookings', getAllBookings);

module.exports = router;
