import { Express, Request, Response, query } from "express";

import Filter from "@/domain/services/task/Filter";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

export default class FilterController {
    constructor(
        private server: Express,
        private usecase: Filter,
        private middlewares: any[]
    ) {
        this.server.get("/task/filter/:page/:take", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const { page, take } = req.params;
                const { id, title, finished } = req.query;

                const params: any = {
                    userId: (req as any).user?.id?.value,
                    page,
                    take,
                    id,
                    title,
                    finished
                }

                const response = await this.usecase.execute(params);

                if (response.registers.length === 0) {
                    res.status(HttpStatusCode.NOT_FOUND).send("Nenhuma tarefa encontrada");
                    return;
                }

                res.status(HttpStatusCode.OK).send(response);
            } catch (error) {
                res.sendStatus(HttpStatusCode.BAD_REQUEST);
            }
        });
    }
}