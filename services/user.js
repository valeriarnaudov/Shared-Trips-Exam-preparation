const User = require("../models/User");
const { compare, hash } = require("bcrypt");

async function register(email, password, gender) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error("Email is taken");
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        hashedPassword,
        gender,
    });

    await user.save();

    return user;
}

async function login(email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error("Email or password incorrect");
    }

    const hashMatch = await compare(password, user.hashedPassword);
    if (!hashMatch) {
        throw new Error("Email or password incorrect");
    }

    return user;
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
    return user;
}

module.exports = {
    login,
    register,
};
