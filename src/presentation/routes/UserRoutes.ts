import { Express } from "express";

import UserSaveController from "@/presentation/controllers/user/SaveController";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import UserSave from "@/application/services/user/save/Save"

import BcryptAdapter from "@/infra/adapters/BcryptAdapter";

export default class UserRoutes {
    constructor(
        private server: Express
    ) {
        const repository = new UserLocalRepository();
        const encrypter = new BcryptAdapter();

        const saveUseCase = new UserSave(repository, encrypter);

        new UserSaveController(this.server, saveUseCase);
    }
}