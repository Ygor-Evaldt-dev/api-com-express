import { Express } from "express";

import SaveUserController from "@/presentation/controllers/user/Save";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import SaveUser from "@/application/services/user/save/Save"

import BcryptAdapter from "@/infra/adapters/BcryptAdapter";

export default class UserRoutes {
    constructor(
        private server: Express
    ) {
        const repository = new UserLocalRepository();
        const encrypter = new BcryptAdapter();

        const saveUseCase = new SaveUser(repository, encrypter);

        new SaveUserController(this.server, saveUseCase);
    }
}