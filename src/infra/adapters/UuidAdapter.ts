import IUuid from "@/domain/ports/IUuid";
import { v4 as uuidv4, validate } from "uuid";

export default class UuidAdapter implements IUuid {
    generate(): string {
        return uuidv4();
    }

    validate(id: string): boolean {
        return validate(id);
    }
}