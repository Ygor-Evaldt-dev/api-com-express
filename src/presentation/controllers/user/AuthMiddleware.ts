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

    get() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const authorization = req.headers.authorization;
            try {
                if (!authorization) {
                    this.unauthorizedRes(res);
                    return;
                }

                const tokenUser = this.tokenProvider.validate(authorization.split(" ")[1]) as User;
                const user = await this.repository.find(tokenUser.email.complete);
                if (user === null) {
                    this.unauthorizedRes(res);
                    return;
                }

                (req as any).user = user;
                next();
            } catch (error: any) {
                this.unauthorizedRes(res);
            }
        }
    }

    private unauthorizedRes(res: Response): void {
        res.status(HttpStatusCode.UNAUTHORIZED).send("Não autorizado");
    }
}