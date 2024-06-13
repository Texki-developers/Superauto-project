import express, {Application, Request, Response} from 'express';
import logger from 'morgan';
import path from 'path'
import cors from 'cors'

const app:Application = express();

// configure environment variables
require('dotenv').config();

// Middleware
app.use(logger('dev'));

app.use(express.urlencoded({limit: 50 * 1024 * 1024}));
app.use(express.json({limit: '50mb'}));

app.use("*/images",express.static("./public/uploads"));
app.use("/public", express.static(path.join(__dirname,'public')))

app.use(cors());

app.get('/', (_:Request, res: Response) => {
    res.send('Super Auto V1')
})

export { app }
