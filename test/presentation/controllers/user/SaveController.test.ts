import AxiosInstance from "../../util/AxiosInstance";
import users from "../../util/users";

describe("user save controller", () => {
    const api = AxiosInstance.generate();

    test("should create a new user", async () => {
        try {
            const response = await api.post("/user/save", {
                ...users.validCredentials,
                name: "Administrador",
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