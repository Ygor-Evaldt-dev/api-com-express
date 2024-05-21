import HttpStatusCode from "@src/core/constants/HttpStatusCode";
import { Express, Request, Response } from "express";

export default class Default {
    constructor(
        private server: Express
    ) {
        this.server.get("/", (req: Request, res: Response) => {
            res.status(HttpStatusCode.OK).send("Servidor online");
        });
    }
}