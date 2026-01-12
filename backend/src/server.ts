import 'dotenv/config'; // Load .env variables

import express from 'express';
import cors from 'cors';
import { env } from '@config/env.js';
// --- CONFIGURATION ---
const app = express();
const port = env.PORT;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// Global error handler (must be last)

// --- SERVER STARTUP ---
app.get('/', (_, res) => res.send('Hello from Vercel!'));
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});