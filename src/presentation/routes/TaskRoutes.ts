import { Express } from "express";

import AuthMiddleware from "@/presentation/controllers/user/AuthMiddleware";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import Save from "@/domain/services/task/Save";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import SaveController from "../controllers/task/SaveController";
import Delete from "@/domain/services/task/Delete";
import DeleteController from "../controllers/task/DeleteController";
import FindController from "../controllers/task/FindController";
import FindUnique from "@/domain/services/task/FindUnique";
import FindMany from "@/domain/services/task/FindMany";
import FindManyController from "../controllers/task/FindManyController";
import ITokenProvider from "@/domain/ports/ITokenProvider";

export default class TaskRoutes {
    constructor(
        private server: Express,
        private tokenProvider: ITokenProvider
    ) {
        const userRepository = new UserLocalRepository();
        const taskRepository = new TaskLocalRepository();

        const authMiddleware = new AuthMiddleware(userRepository, this.tokenProvider).user;

        const saveUseCase = new Save(taskRepository);
        const deleteUseCase = new Delete(taskRepository);
        const findUseCase = new FindUnique(taskRepository);
        const findManyUseCase = new FindMany(taskRepository);

        new SaveController(this.server, saveUseCase, [authMiddleware]);
        new DeleteController(this.server, deleteUseCase, [authMiddleware]);
        new FindController(this.server, findUseCase, [authMiddleware]);
        new FindManyController(this.server, findManyUseCase, [authMiddleware]);
    }
}