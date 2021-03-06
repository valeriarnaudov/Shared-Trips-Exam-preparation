const authController = require("../controllers/auth");
const tripController = require("../controllers/trip");
const homeController = require("../controllers/home");

module.exports = (app) => {
    app.use(homeController);
    app.use(tripController);
    app.use(authController);

    app.get("*", (req, res) => {
        res.render("404", { title: "Not Found" });
    });
};
