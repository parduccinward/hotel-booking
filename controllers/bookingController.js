const pool =require("../models/db");

const getBookings = async (req,res) => {
    try {
        const allBookings = await pool.query("SELECT * FROM bookings");
        res.json(allBookings.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getBooking = async (req, res) => {
    try {
        const {id} = req.params;
        const booking = await pool.query("SELECT * FROM bookings WHERE booking_id = $1 ",[id]);
        res.json(booking.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const createBooking = async (req, res) => {
    try {
        const {booking_date, arrival_date, departure_date, num_persons, booking_state, hotel_id, guest_id} = req.body;
        const newBooking = await pool.query(
            "INSERT INTO bookings (booking_date, arrival_date, departure_date, num_persons, booking_state,  hotel_id, guest_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
             [booking_date, arrival_date, departure_date, num_persons, booking_state,  hotel_id, guest_id]
             );
        const numberOfRoomsNeeded = Math.round(num_persons/2);
        let newJsonData = {
            "rooms_needed": numberOfRoomsNeeded
        }
        newBooking.rows.push(newJsonData);
        res.json(newBooking.rows);
    } catch (err) {
        console.error(err.message); 
    }
};

const deleteBooking = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteBooking = await pool.query("DELETE FROM bookings WHERE booking_id =$1",[id]);
        res.json("Booking was deleted successfully!")
    } catch (err) {
        console.error(err.message);
    }
};

const updateBooking = async (req, res) => {
    try {
        const {id} = req.params;
        const {booking_date, arrival_date, departure_date, num_persons, booking_state, hotel_id, guest_id} = req.body;
        const updatebooking = await pool.query(
            "UPDATE bookings SET booking_date = $1, arrival_date = $2, departure_date = $3, num_persons = $4, booking_state = $5, hotel_id = $6, guest_id = $7 WHERE booking_id = $8",
             [booking_date, arrival_date, departure_date, num_persons, booking_state, hotel_id, guest_id, id]
             );
        res.json("Booking was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    deleteBooking,
    updateBooking
};