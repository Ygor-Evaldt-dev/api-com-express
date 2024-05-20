import { Express, Request, Response } from "express";

import UserSave from "@src/services/user/Save";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

export default class Save {
    constructor(
        private server: Express,
        private usecase: UserSave
    ) {
        this.server.post("/usuario/salvar", async (req: Request, res: Response) => {
            try {
                const newUser = await this.usecase.execute({ ...req.body });
                res.status(HttpStatusCodes.CREATED).send(newUser);
            } catch (error: any) {
                res.status(HttpStatusCodes.BAD_REQUEST).send(error.message);
            }
        });
    }
}