import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default class AxiosInstance {
    static generate() {
        return axios.create({
            baseURL: `${process.env.ADDRESS}:${process.env.PORT}`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}