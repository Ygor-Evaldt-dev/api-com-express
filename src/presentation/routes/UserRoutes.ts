import { Express } from "express";

import SaveController from "@/presentation/controllers/user/SaveController";
import LocalRepository from "@/infra/repositories/user/LocalRepository";
import Save from "@/application/services/user/Save"
import Login from "@/application/services/user/Login";

import BcryptAdapter from "@/infra/adapters/BcryptAdapter";
import JwtAdapter from "@/infra/adapters/JwtAdapter";
import LoginController from "../controllers/user/LoginController";

export default class UserRoutes {
    constructor(
        private server: Express
    ) {
        const localRepository = new LocalRepository();
        const encrypter = new BcryptAdapter();
        const tokenProvider = new JwtAdapter(process.env.SECRET_TOKEN!);

        const saveUseCase = new Save(localRepository, encrypter);
        const loginUseCase = new Login(localRepository, encrypter, tokenProvider);

        new SaveController(this.server, saveUseCase);
        new LoginController(this.server, loginUseCase);
    }
}