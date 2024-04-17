const express = require('express');
const cors = require('cors');
const connectToDb = require('./db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const sgpaRoutes = require('./routes/sgpa');

// Connect to the database
connectToDb();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/semester', sgpaRoutes);

// Start the server
const PORT = process.env.EXPRESS_PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
