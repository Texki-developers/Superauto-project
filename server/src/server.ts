
import * as http from 'http';
import { pool } from './config/dbConfig';
import { app } from './app';

const PORT:number | string = process.env.PORT || 8080
const server = http.createServer(app)

const connectWithRetry = () => {
    return pool.connect()
      .then(() => console.log("DB Connected successfully!"))
      .catch((error: any) => {
        console.error('DB connection failed. Retrying...', error);
        setTimeout(connectWithRetry, 5000);
      });
  };
  

server.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`)
    // Connecting Database
    console.log(`Server started on port ${PORT}`);
    // Connecting Database
    connectWithRetry();
})