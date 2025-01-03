const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.cjs');
const router = express.Router();

const JWT_SECRET = 'yourSecretKey';

router.post('/register', async (req, res) => {
    try {
        const { name, username, password, email, mobile, isAdmin } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }, { mobile }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with that username, email, or mobile' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            username,
            password: hashedPassword,
            email,
            mobile,
            isAdmin,
        });
        await user.save();
        res.status(201).send('User Registered');
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(400).json({ message: 'Error Registering User', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Error Logging In', error: err.message });
    }
});

module.exports = router;
