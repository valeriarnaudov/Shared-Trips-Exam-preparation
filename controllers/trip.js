const { isUser, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { createTrip } = require("../services/trip");
const mapErrors = require("../util/mappers");

const router = require("express").Router();

router.get("/create", isUser(), (req, res) => {
    res.render("create", { title: "Create Trip Offer", data: {} });
});

router.post("/create", isUser(), async (req, res) => {
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        owner: req.session.user._id,
    }

    try {
        await createTrip(trip);
        
        res.redirect("/trips");
    } catch (error) {
        const errors = mapErrors(error);

        res.render("create", {
            data: trip,
            errors,
        });
    }
});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: `Edit Trip`, trip: res.locals.trip });
});

module.exports = router;
