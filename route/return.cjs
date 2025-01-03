const express = require('express');
const Return = require('../models/Return.cjs');
const router = express.Router();

// Borrow Book
router.post('/borrow', async (req, res) => {
    try {
        const { bookId, userId, borrowDate } = req.body;
        const record = new Return({ bookId, userId, borrowDate });
        await record.save();
        res.status(201).send('Book Borrowed');
    } catch (err) {
        res.status(400).send('Error Borrowing Book');
    }
});

// Return Book
router.post('/return', async (req, res) => {
    try {
        const { recordId, fine } = req.body;
        await Return.findByIdAndUpdate(recordId, { fine });
        res.send('Book Returned');
    } catch (err) {
        res.status(400).send('Error Returning Book');
    }
});

module.exports = router;
