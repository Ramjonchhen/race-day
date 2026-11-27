import "reflect-metadata";

import { DataSource } from "typeorm";
import { dbConfig } from "../config/dbConfig"
import path from "node:path"

const migrationsPath = path.join(__dirname , "../db/migrations/*.js");
// setting the timeout time for DB a 7sec = 7000ms 
// having a common ground which suits for realistic production scenario as well
const databaseConnectionTimeoutMS = 7000;
export const AppDataSource = new DataSource(
    {
        type: "postgres",
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        username: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.NAME,
        // explicitly keeping it false on both dev and prod environment
        // ensuring consistent schema update structure
        synchronize: false,
        // explicitly turning down TypeORM query logging on production 
        // as we don't want to log any sensitive data like password_hash
        // and other details on the production logs
        logging: dbConfig.NODE_ENV === "development",
        entities: [],
        migrations: [migrationsPath],
        connectTimeoutMS: databaseConnectionTimeoutMS,
    }
);

export async function loadDatabase() {
    try {
        await AppDataSource.initialize();
        console.log("Connected to the Database");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error Connecting to Database: ", error.stack)
        } else {
            console.error("Error Connecting to Database: ", error);
        }
        process.exit(1);
    }
}