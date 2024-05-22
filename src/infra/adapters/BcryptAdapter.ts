import bcrypt from "bcrypt";
import IEncrypter from "@/core/ports/IEncrypter";

export default class BcryptAdapter implements IEncrypter {
    private saltRounds: number = 12;

    async encrypt(password: string): Promise<string> {
        const result = await bcrypt.hash(password, this.saltRounds)
        return result;
    }

    async compare(password: string, hash: string): Promise<boolean> {
        const result = await bcrypt.compare(password, hash);
        return result;
    }
}