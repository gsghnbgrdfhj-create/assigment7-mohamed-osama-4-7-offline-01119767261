import { MongoClient } from "mongodb";
import chalk from "chalk";
const client = new MongoClient("mongodb://localhost:27017")


export const DB = client.db("MongoDB")

export const testconnection = async()=>{
    try {
        await client.connect()
        console.log(chalk.green("DB connectin successfuly"));
        
    } catch (error) {
        console.log(chalk.red("DB connectin failed"));
        
    }
}