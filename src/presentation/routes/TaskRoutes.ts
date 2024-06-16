import { Express } from "express";

import AuthMiddleware from "@/presentation/controllers/user/AuthMiddleware";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import Save from "@/domain/services/task/Save";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import SaveController from "@/presentation/controllers/task/SaveController";
import Delete from "@/domain/services/task/Delete";
import DeleteController from "@/presentation/controllers/task/DeleteController";
import FindUniqueController from "@/presentation/controllers/task/FindUniqueController";
import FindUnique from "@/domain/services/task/FindUnique";
import FindMany from "@/domain/services/task/FindMany";
import FindManyController from "@/presentation/controllers/task/FindManyController";
import ITokenProvider from "@/domain/ports/ITokenProvider";

import paginationParamsMiddleware from "@/presentation/controllers/task/middlewares/paginationParamsMiddleware";
import Filter from "@/domain/services/task/Filter";
import FilterController from "@/presentation/controllers/task/FilterController";
import taskFiltersMiddleware from "../controllers/task/middlewares/taskFiltersMiddleware";

export default class TaskRoutes {
    constructor(
        private server: Express,
        private tokenProvider: ITokenProvider
    ) {
        const userRepository = new UserLocalRepository();
        const taskRepository = new TaskLocalRepository();

        const authMiddleware = new AuthMiddleware(userRepository, this.tokenProvider).user;

        const saveUseCase = new Save(taskRepository);
        const findUseCase = new FindUnique(taskRepository);
        const findManyUseCase = new FindMany(taskRepository);
        const filterUseCase = new Filter(taskRepository);
        const deleteUseCase = new Delete(taskRepository);

        new SaveController(this.server, saveUseCase, [authMiddleware]);
        new FindUniqueController(this.server, findUseCase, [authMiddleware]);
        new FindManyController(this.server, findManyUseCase, [authMiddleware, paginationParamsMiddleware]);
        new FilterController(this.server, filterUseCase, [authMiddleware, paginationParamsMiddleware, taskFiltersMiddleware]);
        new DeleteController(this.server, deleteUseCase, [authMiddleware]);

    }
}