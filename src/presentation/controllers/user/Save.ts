import { Express, Request, Response } from "express";

import SaveUser from "@/application/services/user/save/Save";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";
import { Input } from "@/application/services/user/save/Input";

export default class Save {
    constructor(
        private server: Express,
        private usecase: SaveUser
    ) {
        this.server.post("/user/save", async (req: Request, res: Response) => {
            try {
                const dto: Input = req.body;
                await this.usecase.execute(dto);

                res.status(HttpStatusCode.CREATED).send("Usuário cadastrado com sucesso");
            } catch (error: any) {
                res.status(HttpStatusCode.BAD_REQUEST).send(error.message);
            }
        });
    }
}