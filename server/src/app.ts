import express, { Application, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import { pool } from './config1/dbConfig';
import { accountRoutes } from './api/v1/routes';
import Accounts from './models/accounts';
import { E_ACCOUNT_CATEGORIES } from './utils/constants/constants';
import fileUpload from 'express-fileupload';

const app: Application = express();

// configure environment variables
require('dotenv').config();

// Middleware
app.use(logger('dev'));

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(express.urlencoded({ limit: 50 * 1024 * 1024 }));
app.use(express.json({ limit: '50mb' }));

///THE ROUTES
app.use('/api/v1/accounts',accountRoutes)

///THE ROUTES

app.use('*/images', express.static('./public/uploads'));


app.use(cors());

app.get('/', (_: Request, res: Response) => {
  res.send('Super Auto V1/..');
});

app.get('/add', async (_: any, res: any) => {
  try {
    const result = await Accounts.create({name: "Muhsin", category: E_ACCOUNT_CATEGORIES.EMPLOYEE, contact_info: "8606113002", head: 1})
    res.status(201).json(result);
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
