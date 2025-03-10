const express = require('express');
const router = express.Router();

const Court = require("../models/court");

router.get("/getAllCourts", async (req, res) => {
    try {
        const courts = await Court.find({});
        res.send(courts);

    } catch (error) {
        console.error("Error fetching courts:", error);
        return res.status(400).json({ message: error });
    }
});


router.post("/getCourtById", async (req, res) => {
    const courtId = req.body.courtId;

    try {
        const court = await Court.findOne({ _id: courtId })
        res.send(court);

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.post("/addCourt", async (req, res) => {
    try {
        const newCourt = new Court(req.body);
        await newCourt.save();
        res.send("New Court added successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.delete("/deleteCourt/:id", async (req, res) => {
    try {
        const court = await Court.findById(req.params.id);

        if (!court) {
            return res.status(404).json({ message: "No court found" })
        }

        await Court.findByIdAndDelete(req.params.id);
        res.send("Court deleted successfully");

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put('/updateCourt/:id', async (req, res) => {
    try {
        const {
            courtId,
            name,
            location,
            maxPlayers,
            price,
            type,
            description,
            imgURLs
        } = req.body;

        if (!courtId || !name || !location || !maxPlayers || !price || !type || !description || !imgURLs) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const court = await Court.findById(req.params.id);
        if (!court) {
            return res.status(404).json({ message: "No court found" });
        }

        court.courtId = courtId;
        court.name = name;
        court.location = location;
        court.maxPlayers = maxPlayers;
        court.price = price;
        court.type = type;
        court.description = description;
        court.imgURLs = imgURLs;

        await court.save();
        res.json({ message: "Court updated successfully", court });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;