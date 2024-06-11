import { Express, Request, Response } from "express";

import Login from "@/domain/services/user/Login";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

export default class LoginController {
    constructor(
        private server: Express,
        private usecase: Login
    ) {
        this.server.post("/user/login", async (req: Request, res: Response) => {
            try {
                const { email, password } = req.body;
                if (!email) throw new Error("E-mail não informado");
                if (!password) throw new Error("Senha não informada");

                const response = await this.usecase.execute({ email, password });
                res.status(HttpStatusCode.OK).send(response);
            } catch ({ message }: any) {
                switch (message.trim().toLowerCase()) {
                    case "e-mail não informado":
                    case "senha não informada":
                        res.status(HttpStatusCode.BAD_REQUEST).send(message);
                        break;
                    case "usuário não cadastrado":
                        res.status(HttpStatusCode.NOT_FOUND).send(message);
                        break;
                    case "senha inválida":
                        res.status(HttpStatusCode.UNAUTHORIZED).send(message);
                        break;
                    default:
                        res.status(HttpStatusCode.SERVICE_UNAVAILABLE).send("Serviço não disponível, tente mais tarde");
                        break;
                }
            }
        });
    }
}