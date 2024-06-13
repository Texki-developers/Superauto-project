
import * as http from 'http';
import { pool } from './config/dbConfig';
import { app } from './app';

const PORT:number | string = process.env.PORT || 8080
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`)
    // Connecting Database
    pool.connect().then(() => console.log("DB Connected successfully!"))
})