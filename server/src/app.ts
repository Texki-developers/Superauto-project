import express, { Application, Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import { pool } from './config1/dbConfig';
import { authRoutes } from './api/v1/routes';

const app: Application = express();

// configure environment variables
require('dotenv').config();

// Middleware
app.use(logger('dev'));

app.use(express.urlencoded({ limit: 50 * 1024 * 1024 }));
app.use(express.json({ limit: '50mb' }));

///THE ROUTES
app.use('/api/v1/auth',authRoutes)

///THE ROUTES


app.use('*/images', express.static('./public/uploads'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors());

app.get('/', (_: Request, res: Response) => {
  res.send('Super Auto V1/..');
});

app.get('/add', async (_: any, res: any) => {
  try {
    const result = await pool.query(`CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send('Error inserting data');
  }
});

// Endpoint to get data from the database
app.get('/data', async (_: any, res: any) => {
  try {
    const result = await pool.query('SELECT * FROM your_table');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});




export { app };
