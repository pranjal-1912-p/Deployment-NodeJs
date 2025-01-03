const express = require('express');
const Book = require('../models/Book.cjs');
const router = express.Router();

// Get All Books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(400).send('Error Fetching Books');
    }
});

// Create Book
router.post('/create', async (req, res) => {
    try {
        const { name, number, genre, type } = req.body;
        const book = new Book({ name, number, genre, type });
        await book.save();
        res.status(201).send('Book Created');
    } catch (err) {
        res.status(400).send('Error Creating Book');
    }
});
// Update Book
router.put('/update/:id', async (req, res) => {
    try {
        const { name, number, genre, type, available } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { name, number, genre, type, available },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).send('Book Not Found');
        }

        res.json(updatedBook);
    } catch (err) {
        res.status(400).send('Error Updating Book');
    }
});


module.exports = router;
