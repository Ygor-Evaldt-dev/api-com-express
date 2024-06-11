import User from "@/domain/models/user/User";

import Delete from "@/domain/services/user/Delete";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";

import users from "../shared/users";

describe('delete user', () => {
    function makeSut() {
        const repository = new UserLocalRepository();
        const usecase = new Delete(repository);

        return ({
            repository,
            usecase
        });
    }

    test("should throw error if user doesn't exists", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute("nonexistent@gmail.com");
        await expect(exec()).rejects.toThrow("Usuário não cadastrado");
    });

    test("should delete a exists user", async () => {
        const { usecase, repository } = makeSut();

        const newUser = new User({ ...users.new });
        await repository.save(newUser);

        const exec = async () => await usecase.execute(newUser.email.complete);
        await expect(exec()).resolves.toBeUndefined();
    });
});