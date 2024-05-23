import SaveUser from "@/core/services/user/Save";
import BcryptAdapter from "@/infra/adapters/BcryptAdapter";
import UserLocalRepository from "@/infra/repositories/user/UserLocalRepository";

import users from "./data";

describe("save user", () => {
    function makeSut() {
        const repository = new UserLocalRepository();
        const encrypter = new BcryptAdapter();
        const usecase = new SaveUser(repository, encrypter);

        return ({
            repository,
            encrypter,
            usecase
        });
    }

    test.skip("should save a new user", async () => {
        const { usecase } = makeSut();
        const newUser = await usecase.execute(users.exists);

        expect(newUser).toHaveProperty("id");
    });

    test("should throw error if is user existing", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute(users.exists);
        await expect(exec()).rejects.toThrow("Usuário já cadastrado");
    });

    test("should throw error if is user has short password", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute(users.shortPassword);
        await expect(exec()).rejects.toThrow("A senha deve ter no mínimo 6 caracteres");
    });

    test("should throw error if is user has invalid password", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute(users.invalidPassword);
        await expect(exec()).rejects.toThrow("A senha deve conter pelo menos uma letra maiúscula, um caractere especial e um número");
    });

});

