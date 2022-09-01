const pool =require("pg");

const getHotels = async (req,res) => {
    try {
        const allHotels = await pool.query("SELECT * FROM hotel");
        res.json(allHotels.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getHotel = async (req, res) => {
    try {
        const {id} = req.params;
        const hotel = await pool.query("SELECT * FROM hotel WHERE hotel_id = $1 ",[id]);
        res.json(hotel.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const createHotel = async (req, res) => {
    try {
        const {hotel_id,hotel_name, hotel_address, city, room_number, phone, website_url} = req.body;
        const newHotel = await pool.query(
            "INSERT INTO hotel (hotel_id,hotel_name, hotel_address, city, room_number, phone, website_url) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
             [hotel_id,hotel_name, hotel_address, city, room_number, phone, website_url]
             );
        res.json(newhotel.rows);
    } catch (err) {
        console.error(err.message); 
    }
};

const deleteHotel = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteHotel = await pool.query("DELETE FROM hotel WHERE hotel_id =$1",[id]);
        res.json("Hotel was deleted successfully!")
    } catch (err) {
        console.error(err.message);
    }
};

const updateHotel = async (req, res) => {
    try {
        const {id} = req.params;
        const {hotel_id,hotel_name, hotel_address, city, room_number, phone, website_url} = req.body;
        const updatehotel = await pool.query(
            "UPDATE hotel SET hotel_id = $1, hotel_name = $2, hotel_address = $3, city = $4, room_number = $5, phone = $6, website_url = $7 WHERE hotel_id = $8",
             [hotel_id,hotel_name, hotel_address, city, room_number, phone, website_url]
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