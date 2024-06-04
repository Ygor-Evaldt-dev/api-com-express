import AxiosInstance from "./AxiosInstance";
import users from "./users";

export default class Authorization {
    static async getHeaders() {
        const { data } = await AxiosInstance.generate().post("/user/login", users.validCredentials);

        return ({
            'Authorization': `Bearer ${data.token}`
        });
    }
}