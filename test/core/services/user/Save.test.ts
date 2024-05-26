import SaveUser from "@/application/services/user/Save";
import BcryptAdapter from "@/infra/adapters/BcryptAdapter";
import UserLocalRepository from "@/infra/repositories/user/UserLocalRepository";

import users from "./data";
import DeleteUser from "@/application/services/user/Delete";

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

    test("should save a new user", async () => {
        const { usecase, repository } = makeSut();
        const newUser = await usecase.execute(users.exists);

        expect(newUser).toHaveProperty("id");
    });

    test("should throw error if is user existing", async () => {
        const { usecase, deleteUser } = makeSut();
        const user = users.exists;

        const exec = async () => await usecase.execute(user);
        await expect(exec()).rejects.toThrow("Usuário já cadastrado");

        await deleteUser.execute(user.email);
    });

    test("should throw error if user has username with spaces", async () => {
        const { usecase } = makeSut();
        const user = { ...users.exists, username: "any username" }

        const exec = async () => await usecase.execute(user);
        await expect(exec()).rejects.toThrow("Nome de usuário não deve conter espaços vazios");
    });

    test("should throw error if user has a short username", async () => {
        const { usecase } = makeSut();
        const user = { ...users.exists, username: "us" }

        const exec = async () => await usecase.execute(user);
        await expect(exec()).rejects.toThrow("Nome de usuário deve ter no mínimo 3 caracteres");
    });

    test("should throw error if user has a too long username", async () => {
        const { usecase } = makeSut();
        const user = { ...users.exists, username: "usernameusernameusernameusername" }

        const exec = async () => await usecase.execute(user);
        await expect(exec()).rejects.toThrow("Nome de usuário deve ter no máximo 20 caracteres");
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

});

