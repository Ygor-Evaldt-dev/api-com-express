import User from "@/domain/models/user/User"

export default interface IUserRepository {
    findUnique(email: string): Promise<User | null>;
    findMany(): Promise<User[] | null>;
    save(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}
