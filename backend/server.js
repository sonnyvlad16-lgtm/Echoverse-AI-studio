import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRouter from './routes/generate.js';
import authRouter from './routes/auth.js';
import paymentsRouter from './routes/payments.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/generate', generateRouter);
app.use('/api/auth', authRouter);
app.use('/api/payments', paymentsRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
