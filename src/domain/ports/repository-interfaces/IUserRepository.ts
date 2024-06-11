import User from "@/domain/models/user/User"

export default interface IUserRepository {
    findAll(): Promise<User[] | null>;
    find(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}
