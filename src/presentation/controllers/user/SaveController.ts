import { Express, Request, Response } from "express";

import SaveUser from "@/domain/services/user/Save";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

export default class SaveController {
    constructor(
        private server: Express,
        private usecase: SaveUser
    ) {
        this.server.post("/user", async (req: Request, res: Response) => {
            try {
                const dto = req.body;
                await this.usecase.execute(dto);

                res.status(HttpStatusCode.CREATED).send("Usuário cadastrado com sucesso");
            } catch (error: any) {
                res.status(HttpStatusCode.BAD_REQUEST).send(error.message);
            }
        });
    }
}