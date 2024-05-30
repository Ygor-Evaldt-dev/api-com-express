import { Express, Request, Response } from "express";
import HttpStatusCode from "../constants/HttpStatusCode";

export default class BaseRoute {
    constructor(
        private server: Express
    ) {
        this.server.get("/", (req: Request, res: Response) => {
            try {
                res.status(HttpStatusCode.OK).send("Serviço online");
            } catch (error: any) {
                res.status(HttpStatusCode.SERVICE_UNAVAILABLE).send("Serviço indisponível, tente mais tarde");
            }
        });
    }
}