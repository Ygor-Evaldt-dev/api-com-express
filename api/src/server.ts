//Setup express server.
import express from 'express';

//Variables
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
