import UserLocalRepository from "@src/infra/repositories/user/UserLocalRepository";
import BcryptAdapter from "@src/infra/adapters/BcryptAdapter";
import SaveUser from "@src/core/services/user/Save";
import users from "../data/users";

describe("SaveUser", () => {

    function makeSut() {
        const repository = new UserLocalRepository();
        const bcrypt = new BcryptAdapter();
        const usecase = new SaveUser(repository, bcrypt);

        return ({
            repository,
            usecase
        });
    }

    test('should throw error if password is wrong', async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute(users.wrongPassword);
        expect(exec).rejects.toThrow("A senha deve ter no mínimo 6 caracteres");
    })

    test('should save a new user', async () => {
        const { usecase } = makeSut();
        const newUser = await usecase.execute(users.new);

        expect(newUser).toHaveProperty('id');
        expect(newUser.email).toBe(users.new.email);
    });

});