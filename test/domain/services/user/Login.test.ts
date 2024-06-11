import dotenv from "dotenv";
dotenv.config();

import BcryptAdapter from "@/infra/adapters/BcryptAdapter";
import JwtAdapter from "@/infra/adapters/JwtAdapter";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import UserLogin from "@/domain/services/user/Login";
import User from "@/domain/models/user/User";
import users from "../shared/users";

describe("login", () => {
    async function makeSut() {
        const userRepository = new UserLocalRepository()
        const encrypter = new BcryptAdapter()
        const tokenProvider = new JwtAdapter(process.env.SECRET_TOKEN!);
        const usecase = new UserLogin(userRepository, encrypter, tokenProvider);

        const encryptedPassword = await encrypter.encrypt(users.new.password);
        const existingUser = new User({ ...users.new, password: encryptedPassword });
        await userRepository.save(existingUser);

        return ({
            userRepository,
            encrypter,
            tokenProvider,
            existingUser,
            usecase
        });
    }

    test("should to authenticate a valid user", async () => {
        const { usecase, userRepository, existingUser } = await makeSut();

        const authenticatedUser = await usecase.execute({
            email: existingUser.email.complete,
            password: users.new.password
        });

        await userRepository.delete(existingUser.id.value);

        expect(authenticatedUser).toBeDefined();
        expect(authenticatedUser).toHaveProperty("token");
        expect(authenticatedUser.user?.id?.value).toBe(existingUser.id?.value);
    });

    test("should throw error if a wrong password has informed", async () => {
        const { usecase, userRepository, existingUser } = await makeSut();

        const exec = async () => await usecase.execute({
            email: existingUser.email.complete,
            password: "any_wrong_passwod"
        });

        await expect(exec()).rejects.toThrow("Senha inválida");

        await userRepository.delete(existingUser.id.value);
    });

    test("should throw error if user is not exists", async () => {
        const { usecase, userRepository, existingUser } = await makeSut();

        const exec = async () => await usecase.execute({
            email: "any_user",
            password: "any_passwod"
        });

        await expect(exec()).rejects.toThrow("Usuário não cadastrado");

        await userRepository.delete(existingUser.id.value);
    });
});