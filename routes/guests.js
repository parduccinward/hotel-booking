const express = require('express');

const {
    getGuests,
    getGuest,
    createGuest,
    deleteGuest,
    updateGuest
} = require("../controllers/guestController");

const router = express.Router();

router.get("/",getGuests);
router.get("/:id",getGuest);
router.post("/",createGuest);
router.delete("/:id",deleteGuest);
router.put("/:id",updateGuest);

module.exports = router;
