const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { parseCV } = require('../utils/cvParser');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'portfolio.json');

// POST /api/upload-cv — Upload and parse a CV PDF
router.post('/upload-cv', upload.single('cv'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No CV file uploaded' });
        }

        // Parse the CV
        const parsedData = await parseCV(req.file.path);

        // Read existing data to preserve images and certificates
        let existingData = {};
        try {
            existingData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        } catch (e) {
            // No existing data
        }

        // Merge parsed data with existing (preserve uploaded images)
        const mergedData = {
            ...existingData,
            ...parsedData,
            profileImage: existingData.profileImage || '',
            certificates: existingData.certificates || [],
            projects: parsedData.projects.map((proj, i) => ({
                ...proj,
                image: existingData.projects?.[i]?.image || ''
            }))
        };

        // Save to JSON file
        fs.writeFileSync(dataPath, JSON.stringify(mergedData, null, 2));

        res.json({
            message: 'CV parsed successfully',
            data: mergedData
        });
    } catch (error) {
        console.error('CV parse error:', error);
        res.status(500).json({ error: 'Failed to parse CV: ' + error.message });
    }
});

module.exports = router;
