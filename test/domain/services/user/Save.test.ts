import SaveUser from "@/domain/services/user/Save";
import DeleteUser from "@/domain/services/user/Delete";
import BcryptAdapter from "@/infra/adapters/BcryptAdapter";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";

import users from "../shared/users";

describe("save user", () => {
    function makeSut() {
        const repository = new UserLocalRepository();
        const encrypter = new BcryptAdapter();
        const usecase = new SaveUser(repository, encrypter);
        const deleteUser = new DeleteUser(repository);

        return ({
            repository,
            encrypter,
            usecase,
            deleteUser
        });
    }

    test("should throw error if user has a short name", async () => {
        const { usecase } = makeSut();
        const user = { ...users.new, name: "us" }

        const exec = async () => await usecase.execute(user);
        await expect(exec()).rejects.toThrow("Nome deve ter no mínimo 3 caracteres");
    });

    test("should throw error if user has a too long name", async () => {
        const { usecase } = makeSut();

        const exec = async () => await usecase.execute(users.longName);
        await expect(exec()).rejects.toThrow("Nome deve ter no máximo 100 caracteres");
    });

    test("should throw error if user has short password", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute(users.wrongPassword);
        await expect(exec()).rejects.toThrow("A senha deve ter no mínimo 6 caracteres");
    });

    test("should throw error if is user has invalid password", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute({ ...users.wrongPassword, password: "shortpass" });
        await expect(exec()).rejects.toThrow("A senha deve conter pelo menos uma letra maiúscula, um caractere especial e um número");
    });

    test("should throw error if user has invalid e-mail", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute(users.wrongEmal);
        await expect(exec()).rejects.toThrow("Endereço de e-mail inválido");
    });

    test("should throw error if user has invalid phone number", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute(users.wrongPhone);
        await expect(exec()).rejects.toThrow("Número de celular inválido");
    });

    test("should save a new user", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute(users.new);
        await expect(exec()).resolves.toBeUndefined();
    });

    test("should throw error if is user existing", async () => {
        const { usecase, deleteUser } = makeSut();
        const user = users.new;

        const exec = async () => await usecase.execute(user);
        await expect(exec()).rejects.toThrow("Usuário já cadastrado");

        await deleteUser.execute(user.email);
    });

});

