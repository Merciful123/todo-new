import express from "express";
import env from "dotenv"
import mongoose from "mongoose";

env.config()

const app = express()



async function connectDatabase() {
    try {
        const uri = process.env.MONGODB_URL;

      

        await mongoose.connect(uri);

        console.log(`Server connected to port ${process.env.PORT}`)

    } catch (error) {
        console.log(error)
    }
}

connectDatabase()