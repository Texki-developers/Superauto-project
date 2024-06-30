import { Sequelize } from "sequelize";

export const db = new Sequelize({
    username: "postgresdb",
    password: "root",
    database: "superauto_db",
    port: 5432,
    host: "superauto_db",
    dialect: 'postgres'
})

export const connectDB = async () => {
    try{
        await db.authenticate();
        console.log('DB Connection has been established successfully');

        await db.sync({force: true})
        console.log('All models were synchronized successfully.');
    }catch(error){
        console.error('Unable to connect to the database: ', error)
    }
}