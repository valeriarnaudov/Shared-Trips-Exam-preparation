const Trip = require("../models/Trip");

async function createTrip(trip) {
    const newTrip = new Trip(trip);
    return await newTrip.save();
}

async function getTripById(id) {
    return await Trip.findById(id).lean();
}

async function getTripAndUsers(id) {
    return await Trip.findById(id).populate('owner').populate('buddies').lean();
}

async function getAllTrips() {
    return Trip.find({}).lean();
}

module.exports = {
    createTrip,
    getTripById,
    getAllTrips,
    getTripAndUsers,
};
