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

const getClientRooms = async (req, res) => {
    try {
        const {id} = req.params;
        const clientRooms = await pool.query("SELECT r.room_number FROM rooms r INNER JOIN bookings b ON b.booking_id = r.booking_id INNER JOIN guests g ON b.guest_id = g.guest_id WHERE g.guest_id=$1;",[id]);
        let jsonRooms = {
            "reserved_rooms": clientRooms.rows
        }
        res.json(jsonRooms);
    } catch (err) {
        console.error(err.message);
    }
}

const findAvailableRooms = async (req,res) => {
    try {
        const availableRooms = await pool.query("SELECT * FROM rooms where occupancy=false");
        let jsonRooms = {
            "rooms_available": availableRooms.rows
        }
        res.json(jsonRooms);
    } catch (err) {
        console.error(err.message);
    }
}

const createRoom = async (req, res) => {
    try {
        const {room_number, occupancy, booking_id} = req.body;
        const newRoom = await pool.query(
            "INSERT INTO rooms (room_number, occupancy, booking_id) VALUES($1, $2, $3) RETURNING *",
             [room_number, occupancy, booking_id]
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
        const {room_number, occupancy, booking_id} = req.body;
        const updateroom = await pool.query(
            "UPDATE rooms SET room_number = $1, occupancy = $2, booking_id = $3 WHERE room_id = $4",
             [room_number, occupancy, booking_id, id]
             );
        res.json("Room was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
};

const assignRooms = async (req,res) =>{
    try {
        const {id} = req.params;
        const rooms = req.body;
        const roomsArray = [];
        rooms.roomsSelected.forEach( room => {
            roomsArray.push(room.room_number);
        })
        const updateOccupancy = await pool.query("UPDATE rooms SET occupancy=true, booking_id=$1 where room_number=ANY($2)",[id, roomsArray]);
        res.json("Cuartos asignados: "+updateOccupancy.rowCount);

    } catch (err) {
        console.error(err.message)
    }
}

const deallocateRooms = async (req,res) =>{
    try {
        const {id} = req.params;
        const updateOccupancy = await pool.query("UPDATE rooms SET occupancy=false, booking_id=null where booking_id=$1",[id]);
        res.json("Cuartos desocupados: "+updateOccupancy.rowCount);

    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    getRooms,
    getRoom,
    getClientRooms,
    createRoom,
    deleteRoom,
    updateRoom,
    findAvailableRooms,
    assignRooms,
    deallocateRooms
};