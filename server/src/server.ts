
import * as http from 'http';
import { pool } from './config1/dbConfig';
import { app } from './app';
import { connectDB } from './config/database';

const PORT:number | string = process.env.PORT || 8080
const server = http.createServer(app)
  

server.listen(PORT, () => {
    try{
        console.log(`Server started on the port ${PORT}`)
        // Connecting Database
        connectDB()
    }
    catch(err){
        console.log(err,"ERROR")
    }
   
})