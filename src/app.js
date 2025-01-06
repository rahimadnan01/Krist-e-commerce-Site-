import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
export { app };

// import routes
import authRouter from './routes/auth.routes.js';

// routers declaration
app.use('/api/v1/users', authRouter);




