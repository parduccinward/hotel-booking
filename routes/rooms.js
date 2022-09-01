const express = require('express');

const {
    getRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom,
    findAvailableRooms,
    assignRooms
} = require("../controllers/roomController");

const router = express.Router();

router.get("/",getRooms);
router.get("/find",findAvailableRooms);
router.get("/:id",getRoom);
router.post("/",createRoom);
router.delete("/:id",deleteRoom);
router.put("/:id",updateRoom);
router.put("/assign/:id",assignRooms);

module.exports = router;
