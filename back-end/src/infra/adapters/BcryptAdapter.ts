import bcrypt from "bcrypt";
import IBcrypt from "@src/ports/IBcrypt";

export default class BcryptAdapter implements IBcrypt {
    private saltRounds: number = 12;

    async hash(password: string): Promise<string> {
        const result = await bcrypt.hash(password, this.saltRounds)
        return result;
    }

    hashSync(password: string): string {
        return bcrypt.hashSync(password, this.saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        const result = await bcrypt.compare(password, hash);
        return result;
    }
}