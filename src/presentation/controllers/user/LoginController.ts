import UserLogin from "@/application/services/user/Login";
import HttpStatusCode from "@/presentation/constants/HttpStatusCode";
import { Express, Request, Response } from "express";

export default class LoginController {
    constructor(
        private server: Express,
        private usecase: UserLogin
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
                        res.status(HttpStatusCode.UNAUTHORIZED).send(message);
                        break;
                    case "usuário não cadastrado":
                        res.status(HttpStatusCode.NOT_FOUND).send(message);
                        break;
                    case "denha inválida":
                        res.status(HttpStatusCode.UNAUTHORIZED).send(message);
                        break;
                    default:
                        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("Erro interno inesperado");
                        break;
                }
            }
        });
    }
}