import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Express, Request, Response } from "express";

export default class Login {
    constructor(
        private server: Express
    ) {
        this.server.post("/logar", (req: Request, res: Response) => {
            try {
                //logar usuário
            } catch (error: any) {
                //tratar erro
            }
        })
    }
}