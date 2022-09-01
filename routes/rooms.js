const express = require('express');

const {
    getRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom
} = require("../controllers/roomController");

const router = express.Router();

router.get("/",getRooms);
router.get("/:id",getRoom);
router.post("/",createRoom);
router.delete("/:id",deleteRoom);
router.put("/:id",updateRoom);

module.exports = router;
