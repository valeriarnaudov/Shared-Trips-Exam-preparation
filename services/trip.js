const Trip = require("../models/Trip");
const User = require("../models/User");

async function createTrip(trip) {
    const result = new Trip(trip);
    await result.save();

    const user = await User.findById(result.owner);
    user.trips.push(result._id);
    await user.save();
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

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    if (trip.buddies.includes(userId)) {
        throw new Error("You are already in this trip");
    }

    trip.buddies.push(userId);
    await trip.save();
}

async function getTripsByUser(userId) {
    return Trip.find({ owner: userId }).lean();
}

module.exports = {
    createTrip,
    getTripById,
    getAllTrips,
    getTripAndUsers,
    updateTrip,
    deleteById,
    joinTrip,
    getTripsByUser,
};
