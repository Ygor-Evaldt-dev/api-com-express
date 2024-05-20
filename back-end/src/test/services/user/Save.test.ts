import UserMockRepository from "@src/infra/repositories/user/UserMockRepository";
import SaveUser from "@src/services/user/Save";
import users from "@src/test/services/data/users";

describe("SaveUser", () => {

    function makeSut() {
        const repository = new UserMockRepository();
        const usecase = new SaveUser(repository);

        return ({
            repository,
            usecase
        });
    }

    test('should save a new user', async () => {
        const { usecase } = makeSut();
        const newUser = await usecase.execute(users.new);

        expect(newUser.username).toBe("usuario.01");
    });

});