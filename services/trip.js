const Trip = require("../models/Trip");

async function createTrip(trip) {
    const newTrip = new Trip(trip);
    return await newTrip.save();
}

async function getTripById(id) {
    return await Trip.findById(id);
}

module.exports = {
    createTrip,
    getTripById,
};
