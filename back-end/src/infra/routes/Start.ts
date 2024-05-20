
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export default class Start {
    constructor(
        private server: Express
    ) {
        this.server.use(
            express.json(),
            express.urlencoded({ extended: true }),
        );

        const { PORT, ADDRESS } = process.env;
        this.server.listen(PORT, () => {
            console.log(`Server running on address ${ADDRESS}:${PORT}`);
        });
    }
}