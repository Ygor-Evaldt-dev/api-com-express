import { Express, Request, Response } from "express";

import Delete from "@/domain/services/task/Delete";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

export default class DeleteController {
    constructor(
        private server: Express,
        private usecase: Delete,
        private middlewares: any
    ) {
        this.server.delete("/task/delete/:id", ...middlewares, async (req: Request, res: Response) => {
            try {
                await this.usecase.execute(req.params?.id);
                res.status(HttpStatusCode.OK).send("Tarefa deletada com sucesso");
            } catch ({ message }: any) {
                if (message.toLowerCase() === "tarefa não cadastrada") {
                    res.status(HttpStatusCode.NOT_FOUND).send(message);
                    return;
                }
                res.status(HttpStatusCode.SERVICE_UNAVAILABLE).send("Serviço indisponível, tente mais tarde");
            }
        })
    }
}