const express = require('express');

const {
    getBills,
    getBill,
    createBill,
    deleteBill,
    updateBill
} = require("../controllers/billController");

const router = express.Router();

router.get("/",getBills);
router.get("/:id",getBill);
router.post("/:id",createBill);
router.delete("/:id",deleteBill);
router.put("/:id",updateBill);

module.exports = router;
