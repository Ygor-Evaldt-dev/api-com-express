import { Express, Request, Response } from "express";

import Save from "@/domain/services/task/Save";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

export default class SaveController {
    constructor(
        private server: Express,
        private usecase: Save,
        private middlewares: any[]
    ) {
        this.server.post("/task/save", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const task = Object.assign(req.body, {
                    userId: (req as any).user.id.value
                });

                await this.usecase.execute(task);
                res.status(HttpStatusCode.CREATED).send("Tarefa cadastrada com sucesso");
            } catch (error: any) {
                res.status(HttpStatusCode.BAD_REQUEST).send(error.message);
            }
        });
    }
}