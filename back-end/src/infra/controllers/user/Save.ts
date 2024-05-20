import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Express, Request, Response } from "express";

export default class Save {
    constructor(
        private server: Express
    ) {
        this.server.post("/usuario/salvar", async (req: Request, res: Response) => {
            try {
                // save new user
            } catch (error: any) {
                res.status(HttpStatusCodes.BAD_REQUEST).send(error.message);
            }
        });
    }
}