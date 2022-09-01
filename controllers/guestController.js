const pool =require("../models/db");

const getGuests = async (req,res) => {
    try {
        const allGuests = await pool.query("SELECT * FROM guests");
        res.json(allGuests.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getGuest = async (req, res) => {
    try {
        const {id} = req.params;
        const guest = await pool.query("SELECT * FROM guests WHERE guest_id = $1 ",[id]);
        res.json(guest.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const createGuest = async (req, res) => {
    try {
        const {first_name, last_name, gender, phone, email, country, city} = req.body;
        const newGuest = await pool.query(
            "INSERT INTO guests (first_name, last_name, gender, phone, email, country, city) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
             [first_name, last_name, gender, phone, email, country, city]
             );
        res.json(newGuest.rows);
    } catch (err) {
        console.error(err.message); 
    }
};

const deleteGuest = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteGuest = await pool.query("DELETE FROM guests WHERE guest_id =$1",[id]);
        res.json("Guest was deleted successfully!")
    } catch (err) {
        console.error(err.message);
    }
};

const updateGuest = async (req, res) => {
    try {
        const {id} = req.params;
        const {first_name, last_name, gender, phone, email, country, city} = req.body;
        const updateguest = await pool.query(
            "UPDATE guests SET first_name = $1, last_name = $2, gender = $3, phone = $4, email = $5, country = $6, city = $7 WHERE guest_id = $8",
             [first_name, last_name, gender, phone, email, country, city]
             );
        res.json("Guest was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getGuests,
    getGuest,
    createGuest,
    deleteGuest,
    updateGuest
};