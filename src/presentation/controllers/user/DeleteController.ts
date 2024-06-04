import Delete from "@/application/services/user/Delete";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";
import { Express, Request, Response } from "express";


export default class DeleteController {
    constructor(
        private server: Express,
        private usecase: Delete,
        private middlewares: any[]
    ) {
        this.server.delete("/user/delete", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const { email } = req.body;
                await this.usecase.execute(email);
                res.status(HttpStatusCode.NO_CONTENT).send("Usuário excluído com sucesso");
            } catch (error: any) {
                res.status(HttpStatusCode.NOT_FOUND).send(error.message);
            }
        });
    }
}