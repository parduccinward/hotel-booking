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
        const {total_amount, payment_date, payment_option, booking_id, guest_id} = req.body;
        const newBill = await pool.query(
            "INSERT INTO bills (total_amount, payment_date, payment_option, booking_id, guest_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
             [total_amount, payment_date, payment_option, booking_id, guest_id]
             );
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

module.exports = {
    getBills,
    getBill,
    createBill,
    deleteBill,
    updateBill
};