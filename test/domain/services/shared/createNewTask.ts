import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import User from "@/core/models/user/User";

import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import Task from "@/core/models/task/Task";

import users from "./users";
import tasks from "./tasks";

export default async function createNewTask() {
    const userRepository = new UserLocalRepository();
    const taskRepository = new TaskLocalRepository();

    const user = new User({ ...users.new });
    const task = new Task({ ...tasks.new, userId: user.id.value });

    await userRepository.save(user);
    await taskRepository.save(task);

    return ({
        user,
        task
    });
}