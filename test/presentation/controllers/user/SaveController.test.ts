import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

describe("user save controller", () => {
    const baseURL = `${process.env.ADDRESS}:${process.env.PORT}`;
    const api = axios.create({ baseURL });
    test("should create a new user", async () => {
        try {
            const response = await api.post("/user/save", {
                name: "Administrador",
                email: "evaldtygor@gmail.com",
                password: "Admin@123",
                phone: "51988887777"
            });
            expect(response.status).toBe(201);
        } catch ({ response }: any) {
            const { status, data } = response;

            expect(status).toBe(400);
            expect(data).toBe("Usuário já cadastrado");
        }
    });
});