import { Express, Request, Response, query } from "express";

import Filter from "@/domain/services/task/Filter";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

export default class FilterController {
    constructor(
        private server: Express,
        private usecase: Filter,
        private middlewares: any[]
    ) {
        this.server.get("/task/filter/:userId/:page/:take", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const { userId, page, take } = req.params;
                const { id, title, finished } = req.query;

                const params: any = {
                    userId,
                    page,
                    take,
                    id,
                    title,
                    finished
                }

                const response = await this.usecase.execute(params);

                if (response.registers.length === 0) {
                    res.sendStatus(HttpStatusCode.NOT_FOUND).send("Nenhuma tarefa encontrada");
                    return;
                }

                res.status(HttpStatusCode.OK).send(response);
            } catch (error) {
                res.sendStatus(HttpStatusCode.BAD_REQUEST);
            }
        });
    }
}