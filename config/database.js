const mongoose = require("mongoose");
require("../models/User");
require("../models/Trip");

const dbName = "sharedtrips";
const connectionString = "mongodb://localhost:27017/" + dbName;

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`Connected to ${dbName}`);

        mongoose.connection.on("error", (err) =>
            console.log("Database error: ", err)
        );
    } catch (error) {
        console.log(`Error connecting to ${dbName}: ${error}`);
        process.exit(1);
    }
};
