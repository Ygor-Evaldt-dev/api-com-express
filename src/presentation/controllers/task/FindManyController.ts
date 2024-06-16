import { Express, Request, Response } from "express";

import FindMany from "@/domain/services/task/FindMany";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

export default class FindManyController {
    constructor(
        private server: Express,
        private usecase: FindMany,
        private middlewares: any[]
    ) {
        this.server.get("/task/findMany/:userId/:page/:take", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const { page, take, userId } = req.params;
                const response = await this.usecase.execute({
                    userId,
                    page: +page,
                    take: +take
                });

                if (response.registers.length === 0) {
                    res.sendStatus(HttpStatusCode.NOT_FOUND).send("Nenhuma tarefa cadastrada");
                    return;
                }

                res.status(HttpStatusCode.OK).send(response);
            } catch (error) {
                res.sendStatus(HttpStatusCode.BAD_REQUEST);
            }
        });
    }
}