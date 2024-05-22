//Setup express server.
import express from 'express';
import cors from 'cors';

//Variables
const server = express();

// Basic middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// cors
server.use(cors({
    origin: ["*"]
}));

export default server;
