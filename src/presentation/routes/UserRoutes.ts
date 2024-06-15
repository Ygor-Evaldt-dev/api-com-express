import { Express } from "express";

import LocalRepository from "@/infra/repositories/user/LocalRepository";

import Save from "@/domain/services/user/Save"
import Login from "@/domain/services/user/Login";
import Delete from "@/domain/services/user/Delete";

import SaveController from "@/presentation/controllers/user/SaveController";
import LoginController from "@/presentation/controllers/user/LoginController";
import DeleteController from "@/presentation/controllers/user/DeleteController";

import BcryptAdapter from "@/infra/adapters/BcryptAdapter";
import AuthMiddleware from "@/presentation/controllers/user/AuthMiddleware";
import ITokenProvider from "@/domain/ports/ITokenProvider";

export default class UserRoutes {
    constructor(
        private server: Express,
        private tokenProvider: ITokenProvider
    ) {
        const repository = new LocalRepository();

        const encrypter = new BcryptAdapter();
        const authMiddleware = new AuthMiddleware(repository, this.tokenProvider).user;

        const saveUseCase = new Save(repository, encrypter);
        const loginUseCase = new Login(repository, encrypter, this.tokenProvider);
        const deleteUseCase = new Delete(repository);

        new SaveController(this.server, saveUseCase);
        new LoginController(this.server, loginUseCase);
        new DeleteController(this.server, deleteUseCase, [authMiddleware]);
    }
}