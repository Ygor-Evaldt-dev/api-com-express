import Authorization from "../../util/Authorization";
import AxiosInstance from "../../util/AxiosInstance";
import users from "../../util/users";

describe("delete controller", () => {
    const api = AxiosInstance.generate();

    test("should delete an existing user", async () => {
        const headers: any = await Authorization.validCredentials();
        const { status, data } = await api.delete("/user/delete", {
            headers,
            data: {
                email: users.validCredentials.email
            }
        });

        expect(status).toBe(200);
    });
});