const pool =require("../models/db");

const getHotels = async (req,res) => {
    try {
        const allHotels = await pool.query("SELECT * FROM hotels");
        res.json(allHotels.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getHotel = async (req, res) => {
    try {
        const {id} = req.params;
        const hotel = await pool.query("SELECT * FROM hotels WHERE hotel_id = $1 ",[id]);
        res.json(hotel.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const createHotel = async (req, res) => {
    try {
        const {hotel_name, hotel_address, city, room_number, phone, website_url} = req.body;
        const newHotel = await pool.query(
            "INSERT INTO hotels (hotel_name, hotel_address, city, room_number, phone, website_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
             [hotel_name, hotel_address, city, room_number, phone, website_url]
             );
        res.json(newHotel.rows);
    } catch (err) {
        console.error(err.message); 
    }
};

const deleteHotel = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteHotel = await pool.query("DELETE FROM hotels WHERE hotel_id =$1",[id]);
        res.json("Hotel was deleted successfully!")
    } catch (err) {
        console.error(err.message);
    }
};

const updateHotel = async (req, res) => {
    try {
        const {id} = req.params;
        const {hotel_name, hotel_address, city, room_number, phone, website_url} = req.body;
        const updatehotel = await pool.query(
            "UPDATE hotels SET hotel_name = $1, hotel_address = $2, city = $3, room_number = $4, phone = $5, website_url = $6 WHERE hotel_id = $7",
             [hotel_name, hotel_address, city, room_number, phone, website_url]
             );
        res.json("Hotel was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getHotels,
    getHotel,
    createHotel,
    deleteHotel,
    updateHotel
};