const Place = require('../models/place');

// Add a new place
exports.addPlace = async (req, res) => {
    try {
        const userData = req.user;
        const {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            maxGuests,
            price,
        } = req.body;

        const place = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos, // make sure this matches your schema
            description,
            perks,
            extraInfo,
            maxGuest: maxGuests,
            price,
        });

        res.status(200).json({ place });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

// Return places specific to the logged-in user
exports.userPlaces = async (req, res) => {
    try {
        const userData = req.user;
        const places = await Place.find({ owner: userData.id });
        res.status(200).json(places);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Update a place
exports.updatePlace = async (req, res) => {
    try {
        const userData = req.user;
        const userId = userData.id;
        const {
            id,
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            maxGuests,
            price,
        } = req.body;

        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        if (userId !== place.owner.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        place.set({
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            maxGuest: maxGuests,
            price,
        });

        await place.save();
        res.status(200).json({ message: 'Place updated', place });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Return all places in DB
exports.getPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB query failed" });
    }
};

// Return a single place by ID
exports.singlePlace = async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.status(200).json(place);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Search places in DB
exports.searchPlace = async (req, res) => {
    try {
        const searchword = req.query.key || '';
        const searchMatches = await Place.find({
            $or: [
                { address: { $regex: searchword, $options: "i" } },
                { title: { $regex: searchword, $options: "i" } }
            ]
        });
        res.status(200).json(searchMatches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
