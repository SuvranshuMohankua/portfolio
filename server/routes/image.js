const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'portfolio.json');

// POST /api/upload-image — Upload an image (profile, project, certificate)
router.post('/upload-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        const imageUrl = `/uploads/images/${req.file.filename}`;
        const { type, projectId } = req.body; // type: 'profile' | 'project' | 'certificate'

        // Read current portfolio data
        let data = {};
        try {
            data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        } catch (e) {
            data = {};
        }

        // Update the appropriate field
        if (type === 'profile') {
            data.profileImage = imageUrl;
        } else if (type === 'project' && projectId !== undefined) {
            const idx = parseInt(projectId);
            if (data.projects && data.projects[idx]) {
                data.projects[idx].image = imageUrl;
            }
        } else if (type === 'certificate') {
            if (!data.certificates) data.certificates = [];
            data.certificates.push({
                id: data.certificates.length + 1,
                title: req.body.title || 'Certificate',
                image: imageUrl
            });
        }

        // Save updated data
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        res.json({
            message: 'Image uploaded successfully',
            imageUrl,
            data
        });
    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

module.exports = router;
