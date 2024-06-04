import AxiosInstance from "./AxiosInstance";
import users from "./users";

export default class Authorization {
    static async get() {
        const { data } = await AxiosInstance.generate().post("/user/login", users.validCredentials);

        return ({
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
    }
}