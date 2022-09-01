const pool =require("../models/db");

const getRooms = async (req,res) => {
    try {
        const allRooms = await pool.query("SELECT * FROM rooms");
        res.json(allRooms.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const room = await pool.query("SELECT * FROM rooms WHERE room_id = $1 ",[id]);
        res.json(room.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const createRoom = async (req, res) => {
    try {
        const {occupancy, booking_id} = req.body;
        const newRoom = await pool.query(
            "INSERT INTO rooms (occupancy, booking_id) VALUES($1, $2) RETURNING *",
             [occupancy, booking_id]
             );
        res.json(newRoom.rows);
    } catch (err) {
        console.error(err.message); 
    }
};

const deleteRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteRoom = await pool.query("DELETE FROM rooms WHERE room_id =$1",[id]);
        res.json("Room was deleted successfully!")
    } catch (err) {
        console.error(err.message);
    }
};

const updateRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const {occupancy, booking_id} = req.body;
        const updateroom = await pool.query(
            "UPDATE rooms SET occupancy = $1, booking_id = $2 WHERE room_id = $3",
             [occupancy, booking_id, id]
             );
        res.json("Room was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom
};