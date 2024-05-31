import ITokenProvider from "@/core/ports/ITokenProvider";
import jwt from "jsonwebtoken";

export default class JwtAdapter implements ITokenProvider {
    constructor(
        private secret: string
    ) { }

    generate(data: string | object): string {
        return jwt.sign(data, this.secret, { expiresIn: "1d" });
    }
    validate(token: string): string | object {
        return jwt.verify(token, this.secret);
    }
}