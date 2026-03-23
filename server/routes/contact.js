const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, '..', 'data', 'contacts.json');

// POST /api/contact — Save a contact form message
router.post('/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        // Read existing contacts
        let contacts = [];
        try {
            contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf-8'));
        } catch (e) {
            contacts = [];
        }

        // Add new message
        const newMessage = {
            id: Date.now(),
            name,
            email,
            message,
            createdAt: new Date().toISOString()
        };
        contacts.push(newMessage);

        // Save
        fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));

        res.json({ message: 'Message sent successfully!', data: newMessage });
    } catch (error) {
        console.error('Contact save error:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// GET /api/contacts — Get all contact messages (admin)
router.get('/contacts', (req, res) => {
    try {
        const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf-8'));
        res.json(contacts);
    } catch (error) {
        res.json([]);
    }
});

module.exports = router;
