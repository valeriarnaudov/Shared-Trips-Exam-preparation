const { Schema, model, Types:{ObjectId} } = require("mongoose");

//TODO add validation

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Username is required"],
    },
    hashedPassword: {
        type: String,
        required: [true, "Password is required"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
    },
    trips: {
        type: [ObjectId],
        ref: 'Trip',
        default: [],
    }
});

userSchema.index(
    { email: 1 },
    { unique: true, collation: { locale: "en", strength: "2" } }
);

const User = model('User', userSchema);

module.exports = User;