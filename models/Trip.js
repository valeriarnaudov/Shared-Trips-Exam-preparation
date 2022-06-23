const {
    Schema,
    model,
    Types: { ObjectId },
} = require("mongoose");

const tripSchema = new Schema({
    start: {
        type: String,
        required: [true, "Start is required"],
    },
    end: {
        type: String,
        required: [true, "End is required"],
    },
    date: {
        type: String,
        required: [true, "Date is required"],
    },
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    carImg: {
        type: String,
        required: [true, "Image is required"],
    },
    carBrand: {
        type: String,
        required: [true, "Brand is required"],
    },
    seats: {
        type: Number,
        required: [true, "Seats is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    owner: {
        type: ObjectId,
        ref: "User",
        required: [true, "Owner is required"],
    },
    buddies: {
        type: [ObjectId],
        ref: "User",
        default: [],
    },
});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
