const express = require('express');

const {
    getBookings,
    getBooking,
    createBooking,
    deleteBooking,
    updateBooking
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/",getBookings);
router.get("/:id",getBooking);
router.post("/",createBooking);
router.delete("/:id",deleteBooking);
router.put("/:id",updateBooking);

module.exports = router;
