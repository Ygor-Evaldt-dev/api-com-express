import { Express, Request, Response } from "express";

import UserSave from "@src/core/services/user/Save";
import HttpStatusCode from "@src/core/constants/HttpStatusCode";

export default class Save {
    constructor(
        private server: Express,
        private usecase: UserSave
    ) {
        this.server.post("/usuario/salvar", async (req: Request, res: Response) => {
            try {
                const newUser = await this.usecase.execute({ ...req.body });
                res.status(HttpStatusCode.CREATED).send(newUser);
            } catch (error: any) {
                res.status(HttpStatusCode.BAD_REQUEST).send(error.message);
            }
        });
    }
}