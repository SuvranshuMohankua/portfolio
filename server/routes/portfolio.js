const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'portfolio.json');

// GET /api/portfolio-data — Return the portfolio JSON
router.get('/portfolio-data', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read portfolio data' });
    }
});

// PUT /api/portfolio-data — Update portfolio data manually
router.put('/portfolio-data', (req, res) => {
    try {
        const newData = req.body;
        fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2));
        res.json({ message: 'Portfolio data updated', data: newData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update portfolio data' });
    }
});

module.exports = router;
