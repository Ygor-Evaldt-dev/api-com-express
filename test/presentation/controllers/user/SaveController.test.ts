import AxiosInstance from "../AxiosInstance";

describe("user save controller", () => {
    const api = AxiosInstance.generate();

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