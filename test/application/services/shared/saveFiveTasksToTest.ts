import User from "@/core/models/user/User";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";

import Task from "@/core/models/task/Task";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";

import users from "./users";

const user1 = new User(users.exists)
const user2 = new User({ ...users.exists, email: "user02@gmail.com" });
const tasks = [
    new Task({
        title: "Tarefa 01",
        userId: user1.id.value
    }),
    new Task({
        title: "Tarefa 02",
        userId: user1.id.value
    }),
    new Task({
        title: "Tarefa 03",
        userId: user1.id.value
    }),
    new Task({
        title: "Tarefa 04",
        userId: user2.id.value
    }),
    new Task({
        title: "Tarefa 05",
        userId: user2.id.value
    })
];

export default async function saveFiveTasksToTest() {
    const taskRepository = new TaskLocalRepository();
    await saveUsers([user1, user2]);

    for (const task of tasks) {
        await taskRepository.save(task);
    }

    return ({
        user1,
        user2,
        tasks
    });
}

async function saveUsers(users: User[]) {
    const userRepository = new UserLocalRepository();

    for (const user of users) {
        await userRepository.save(user);
    }
}