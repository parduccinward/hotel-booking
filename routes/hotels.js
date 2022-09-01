const express = require('express');

const {
    getHotels,
    getHotel,
    createHotel,
    deleteHotel,
    updateHotel
} = require("../controllers/hotelController");

const router = express.Router();

router.get("/",getHotels);
router.get("/:id",getHotel);
router.post("/",createHotel);
router.delete("/:id",deleteHotel);
router.put("/:id",updateHotel);

module.exports = router;
