import User from "@src/core/models/user/User"

export default interface IUserRepository {
    findAll(): Promise<User[] | null>;
    find(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
    update(User: User): Promise<void>;
    delete(): Promise<void>;
}
