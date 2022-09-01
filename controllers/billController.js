const pool =require("../models/db");

const getBills = async (req,res) => {
    try {
        const allBills = await pool.query("SELECT * FROM bills");
        res.json(allBills.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getBill = async (req, res) => {
    try {
        const {id} = req.params;
        const bill = await pool.query("SELECT * FROM bills WHERE bill_id = $1 ",[id]);
        res.json(bill.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const createBill = async (req, res) => {
    try {
        const {id} = req.params;
        const guest_id = id;
        const {payment_option,rate} = req.body;
        const total_amount = await generateTotalAmount(guest_id, rate);
        const payment_date = new Date();
        const booking_id = await getBookingId(guest_id);
        const newBill = await pool.query(
            "INSERT INTO bills (total_amount, payment_date, payment_option, booking_id, guest_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
             [total_amount, payment_date, payment_option, booking_id, guest_id]
             );
        await changeBookingState(booking_id);
        await deallocateRooms(booking_id);
        res.json(newBill.rows);
    } catch (err) {
        console.error(err.message); 
    }
};

const deleteBill = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteBill = await pool.query("DELETE FROM bills WHERE bill_id =$1",[id]);
        res.json("Bill was deleted successfully!")
    } catch (err) {
        console.error(err.message);
    }
};

const updateBill = async (req, res) => {
    try {
        const {id} = req.params;
        const {total_amount, payment_date, payment_option, booking_id, guest_id} = req.body;
        const updatebill = await pool.query(
            "UPDATE bills SET total_amount = $1, payment_date = $2, payment_option = $3, booking_id = $4, guest_id = $5 WHERE bill_id = $6",
             [total_amount, payment_date, payment_option, booking_id, guest_id, id]
             );
        res.json("Bill was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
};

const getBookingId = async function(guestId){
    const bookingQuery = await pool.query("SELECT booking_id from bookings where guest_id=$1",[guestId]);
    return bookingQuery.rows[0].booking_id;
}

const generateTotalAmount = async function (guestId, rate) {
    const nights = await getBookingNights(guestId);
    const rooms = await getGuestRooms(guestId);
    return (rate*nights*rooms);
}

const getBookingNights = async function (guestId){
    const datesStayed = await pool.query("SELECT arrival_date, departure_date from bookings where guest_id=$1",[guestId]);
    const arrivalDate = datesStayed.rows[0].arrival_date;
    const departureDate = datesStayed.rows[0].departure_date;
    return Math.ceil(Math.abs(departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
}

const getGuestRooms = async function (guestId){
    const clientRooms = await pool.query("SELECT r.room_number FROM rooms r INNER JOIN bookings b ON b.booking_id = r.booking_id INNER JOIN guests g ON b.guest_id = g.guest_id WHERE g.guest_id=$1;",[guestId]);
    return clientRooms.rowCount;
}

const changeBookingState = async function(bookingId){
    const bookingQuery = await pool.query("UPDATE bookings SET booking_state = $1 where booking_id=$2",['Paid',bookingId]);
}

const deallocateRooms = async function(bookingId){
    const updateOccupancy = await pool.query("UPDATE rooms SET occupancy=false, booking_id=null where booking_id=$1",[bookingId]);
}


module.exports = {
    getBills,
    getBill,
    createBill,
    deleteBill,
    updateBill
};