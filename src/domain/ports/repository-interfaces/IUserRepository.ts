import User from "@/domain/models/user/User"

export default interface IUserRepository {
    save(user: User): Promise<void>;
    findUnique(email?: string, id?: string): Promise<User | null>;
    findMany(): Promise<User[] | null>;
    delete(id: string): Promise<void>;
}
