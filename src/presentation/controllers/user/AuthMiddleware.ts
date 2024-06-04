import { Request, Response, NextFunction } from "express";

import ITokenProvider from "@/core/ports/ITokenProvider";
import IUserRepository from "@/core/ports/repository-interfaces/IUserRepository";

import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

import User from "@/core/models/user/User";

export default class AuthMiddleware {
    constructor(
        private repository: IUserRepository,
        private tokenProvider: ITokenProvider
    ) { }

    get user() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const authorization = req.headers.authorization;
            try {
                if (!authorization) {
                    this.unauthorized(res);
                    return;
                }

                const tokenUser: any = this.tokenProvider.validate(authorization.split(" ")[1]);
                const user = await this.repository.find(tokenUser.email);
                if (user === null) {
                    this.notFound(res);
                    return;
                }

                (req as any).user = user;
                next();
            } catch (error: any) {
                this.unauthorized(res);
            }
        }
    }

    private unauthorized(res: Response): void {
        res.status(HttpStatusCode.UNAUTHORIZED).send("Não autorizado");
    }

    private notFound(res: Response): void {
        res.status(HttpStatusCode.NOT_FOUND).send("Usuário não cadastrado");

    }
}