const {
    Schema,
    model,
    Types: { ObjectId },
} = require("mongoose");

const EMAIL_PATTERN = /^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z0-9]+)$/;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Username is required"],
        validate: {
            validator: (email) => EMAIL_PATTERN.test(email),
            message: "Invalid email",
        },
    },
    hashedPassword: {
        type: String,
        required: [true, "Password is required"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["male", "female"],
    },
    trips: {
        type: [ObjectId],
        ref: "Trip",
        default: [],
    },
});

userSchema.index(
    { email: 1 },
    { unique: true, collation: { locale: "en", strength: "2" } }
);

const User = model("User", userSchema);

module.exports = User;
