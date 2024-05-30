//Setup express server.
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

//Variables
const server = express();

// Basic middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// cors
server.use(cors({
    origin: ["*"]
}));



const { PORT, ADDRESS } = process.env;
server.listen(PORT, () => {
    console.log(`Server online on ${ADDRESS}:${PORT}`);
})

export default server;
