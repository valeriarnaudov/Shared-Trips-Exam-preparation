const Trip = require("../models/Trip");

async function createTrip(trip) {
    const newTrip = new Trip(trip);
    return await newTrip.save();
}

async function getTripById(id) {
    return await Trip.findById(id).lean();
}

async function getTripAndUsers(id) {
    return await Trip.findById(id).populate("owner").populate("buddies").lean();
}

async function getAllTrips() {
    return Trip.find({}).lean();
}

async function updateTrip(id, trip) {
    const existing = await Trip.findById(id);

    existing.start = trip.start;
    existing.end = trip.end;
    existing.date = trip.date;
    existing.time = trip.time;
    existing.carImg = trip.carImg;
    existing.carBrand = trip.carBrand;
    existing.seats = Number(trip.seats);
    existing.price = Number(trip.price);
    existing.description = trip.description;

    await existing.save();
}

async function deleteById(id) {
    await Trip.findByIdAndDelete(id);
}

module.exports = {
    createTrip,
    getTripById,
    getAllTrips,
    getTripAndUsers,
    updateTrip,
    deleteById,
};
