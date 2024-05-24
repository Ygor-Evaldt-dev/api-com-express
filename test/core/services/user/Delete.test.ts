import Delete from "@/application/services/user/Delete";
import UserLocalRepository from "@/infra/repositories/user/UserLocalRepository";

import users from "./data";

describe('delete user', () => {
    function makeSut() {
        const repository = new UserLocalRepository();
        const usecase = new Delete(repository);

        return ({
            repository,
            usecase
        });
    }

    test("should delete a exists user", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute(users.exists.email);
        await expect(exec()).resolves.toBeUndefined();
    });

    test("should throw error if user doesn't exists", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute("nonexistent@gmail.com");
        await expect(exec()).rejects.toThrow("Usuário não cadastrado");
    });
});