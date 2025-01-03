const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.cjs');
const bookRoutes = require('./routes/book.cjs');
const returnRoutes = require('./routes/return.cjs');

 


const app = express();
require('dotenv').config();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
const MONGO_URI='mongodb://127.0.0.1:27017/library';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/returns', returnRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
