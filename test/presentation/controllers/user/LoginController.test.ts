import AxiosInstance from "../AxiosInstance";

describe("login controller", () => {
    const api = AxiosInstance.generate();
    const endpoint = "/user/login";
    const credentials = {
        email: "evaldtygor@gmail.com",
        password: "Admin@123"
    }

    test("should authenticate a valid user", async () => {
        const { status, data } = await api.post(endpoint, credentials);

        expect(status).toBe(200);
        expect(data.token).toBeDefined();
        expect(data.user.email.complete).toBe(credentials.email);
    });

    test("should return bad request http status if email is not provided", async () => {
        try {
            const { status } = await api.post(endpoint, { ...credentials, email: null });
            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;
            expect(status).toBe(400);
            expect(data).toBe("E-mail não informado")
        }
    });

    test("should return bad request http status if password is not provided", async () => {
        try {
            const { status } = await api.post(endpoint, {
                ...credentials,
                password: null
            });

            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;

            expect(status).toBe(400);
            expect(data).toBe("Senha não informada")
        }
    });

    test("should return not found http status if user is not registered", async () => {
        try {
            const { status } = await api.post(endpoint, {
                ...credentials,
                email: "any@gmail.com"
            });

            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;

            expect(status).toBe(404);
            expect(data).toBe("Usuário não cadastrado")
        }
    });

    test("should return unauthorized http status if user password is not valid", async () => {
        try {
            const { status } = await api.post(endpoint, {
                ...credentials,
                password: "invalidPassword"
            });

            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;

            expect(status).toBe(401);
            expect(data).toBe("Senha inválida")
        }
    });

    test.skip("should return unavailable http status if something is wrong", async () => {
        try {
            const { status } = await api.post(endpoint, {
                ...credentials,
                password: "invalidPassword"
            });

            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;

            expect(status).toBe(503);
            expect(data).toBe("Serviço não disponível, tente mais tarde");
        }
    });
});