import Delete from "@/application/services/user/Delete";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";

import users from "./data";
import SaveUser from "@/application/services/user/Save";
import BcryptAdapter from "@/infra/adapters/BcryptAdapter";

describe('delete user', () => {
    function makeSut() {
        const repository = new UserLocalRepository();
        const encrypter = new BcryptAdapter();

        const usecase = new Delete(repository);
        const saveUser = new SaveUser(repository, encrypter);

        return ({
            repository,
            usecase,
            saveUser
        });
    }

    test("should throw error if user doesn't exists", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute("nonexistent@gmail.com");
        await expect(exec()).rejects.toThrow("Usuário não cadastrado");
    });

    test("should delete a exists user", async () => {
        const { usecase, saveUser } = makeSut();
        await saveUser.execute(users.exists);

        const exec = async () => await usecase.execute(users.exists.email);
        await expect(exec()).resolves.toBeUndefined();
    });
});