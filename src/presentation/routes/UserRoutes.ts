import { Express } from "express";

import LocalRepository from "@/infra/repositories/user/LocalRepository";

import Save from "@/application/services/user/Save"
import Login from "@/application/services/user/Login";
import Delete from "@/application/services/user/Delete";

import SaveController from "@/presentation/controllers/user/SaveController";
import LoginController from "@/presentation/controllers/user/LoginController";
import DeleteController from "@/presentation/controllers/user/DeleteController";

import BcryptAdapter from "@/infra/adapters/BcryptAdapter";
import JwtAdapter from "@/infra/adapters/JwtAdapter";
import AuthMiddleware from "@/presentation/controllers/user/AuthMiddleware";

export default class UserRoutes {
    constructor(
        private server: Express
    ) {
        const encrypter = new BcryptAdapter();
        const tokenProvider = new JwtAdapter(process.env.SECRET_TOKEN!);

        const repository = new LocalRepository();

        const authMiddleware = new AuthMiddleware(repository, tokenProvider).user;

        const saveUseCase = new Save(repository, encrypter);
        const loginUseCase = new Login(repository, encrypter, tokenProvider);
        const deleteUseCase = new Delete(repository);

        new SaveController(this.server, saveUseCase);
        new LoginController(this.server, loginUseCase);
        new DeleteController(this.server, deleteUseCase, authMiddleware);
    }
}