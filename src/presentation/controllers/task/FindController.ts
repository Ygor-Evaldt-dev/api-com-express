import { Express, Request, Response } from "express";

import Find from "@/domain/services/task/Find";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

export default class FindController {
    constructor(
        private server: Express,
        private usecase: Find,
        private middlewares: any[]
    ) {
        this.server.get("/task/find/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const response = await this.usecase.execute(req.params.id);
                if (response === null) {
                    res.status(HttpStatusCode.NOT_FOUND).send("Tarefa não cadastrada");
                    return;
                }

                res.status(HttpStatusCode.OK).send(response);
            } catch (error) {
                res.sendStatus(HttpStatusCode.BAD_REQUEST);
            }
        });
    }
}