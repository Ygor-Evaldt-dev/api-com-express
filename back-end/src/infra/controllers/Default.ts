import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Express, Request, Response } from "express";

export default class Default {
    constructor(
        private server: Express
    ) {
        this.server.get("/", (req: Request, res: Response) => {
            res.status(HttpStatusCodes.OK).send("Servidor online");
        });
    }
}