const express = require('express');

const {
    getRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom,
    findAvailableRooms,
    assignRooms,
    deallocateRooms
} = require("../controllers/roomController");

const router = express.Router();

router.get("/",getRooms);
router.get("/find",findAvailableRooms);
router.get("/:id",getRoom);
router.post("/",createRoom);
router.delete("/:id",deleteRoom);
router.put("/assign/:id",assignRooms);
router.put("/deallocate/:id",deallocateRooms);
router.put("/:id",updateRoom);

module.exports = router;
