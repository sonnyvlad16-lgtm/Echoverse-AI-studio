import express from 'express';
import { generateImage, generateText } from '../controllers/generateController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/generate - Generare conținut
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { type, prompt, style, tone } = req.body;

        if (type === 'image') {
            const result = await generateImage(prompt, style);
            res.json(result);
        } else if (type === 'text') {
            const result = await generateText(prompt, tone);
            res.json(result);
        } else {
            res.status(400).json({ error: 'Invalid generation type' });
        }
    } catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({ error: 'Generation failed' });
    }
});

export default router;
