import { Express } from "express";

import AuthMiddleware from "@/presentation/controllers/user/AuthMiddleware";
import JwtAdapter from "@/infra/adapters/JwtAdapter";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import Save from "@/domain/services/task/Save";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import SaveController from "../controllers/task/SaveController";
import Delete from "@/domain/services/task/Delete";
import DeleteController from "../controllers/task/DeleteController";
import FindController from "../controllers/task/FindController";
import Find from "@/domain/services/task/Find";

export default class TaskRoutes {
    constructor(
        private server: Express
    ) {
        const userRepository = new UserLocalRepository();
        const taskRepository = new TaskLocalRepository();

        const tokenProvider = new JwtAdapter(process.env.SECRET_TOKEN!);
        const authMiddleware = new AuthMiddleware(userRepository, tokenProvider).user;

        const saveUseCase = new Save(taskRepository);
        const deleteUseCase = new Delete(taskRepository);
        const findUseCase = new Find(taskRepository);

        new SaveController(this.server, saveUseCase, [authMiddleware]);
        new DeleteController(this.server, deleteUseCase, [authMiddleware]);
        new FindController(this.server, findUseCase, [authMiddleware]);
    }
}