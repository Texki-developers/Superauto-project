import express, { Application, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
// @ts-ignore
import session from 'express-session';
import { pool } from './config1/dbConfig';
import { accountRoutes, authRouter, inventoryRoutes, reportRoutes } from './api/v1/routes';
import Accounts from './models/accounts';
import { E_ACCOUNT_CATEGORIES } from './utils/constants/constants';
import fileUpload from 'express-fileupload';
// @ts-ignore
import passport from 'passport';
import './config/passport-config';
import { isAuthenticated } from './api/v1/middlewares/requestValidators/auth.middleware';

const app: Application = express();

// configure environment variables
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight requests

// Middleware
app.use(logger('dev'));

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(express.urlencoded({ limit: 50 * 1024 * 1024 }));
app.use(express.json({ limit: '50mb' }));
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure random string
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: 'strict', path: '/', maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

///THE ROUTES
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/inventory',  inventoryRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/auth', authRouter);
///THE ROUTES

app.use('*/images', express.static('./public/uploads'));
app.get('/', (_: Request, res: Response) => {
  res.send('Super Auto V1/..');
});

app.get('/add', async (_: any, res: any) => {
  try { 
    const result = await Accounts.create({
      name: 'Muhsin',
      category: E_ACCOUNT_CATEGORIES.EMPLOYEE,
      contact_info: '8606113002', 
      head: 1,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send('Error inserting data');
  } 
});

// Endpoint to get data from the database

export { app };
