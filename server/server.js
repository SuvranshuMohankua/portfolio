const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', require('./routes/cv'));
app.use('/api', require('./routes/image'));
app.use('/api', require('./routes/portfolio'));
app.use('/api', require('./routes/contact'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Portfolio server running' });
});

app.listen(PORT, () => {
    console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
});
