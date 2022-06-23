const {
    Schema,
    model,
    Types: { ObjectId },
} = require("mongoose");

const URL_PATTERN = /^https?:\/\/(.+)/;

const tripSchema = new Schema({
    start: {
        type: String,
        required: [true, "Start is required"],
        minlength: [4, "Start must be at least 4 characters long"],
    },
    end: {
        type: String,
        required: [true, "End is required"],
        minlength: [4, "End must be at least 4 characters long"],
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
        validate: {
            validator: (url) => URL_PATTERN.test(url),
            message: "Invalid image URL",
        },
    },
    carBrand: {
        type: String,
        required: [true, "Brand is required"],
        minlength: [4, "Brand must be at least 4 characters long"],
    },
    seats: {
        type: Number,
        required: [true, "Seats is required"],
        min: [0, "Seats must be at least 0"],
        max: [4, "Seats must be at most 4"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Price must be at least 1"],
        max: [50, "Price must be at most 50"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters long"],
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
