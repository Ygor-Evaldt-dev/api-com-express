import User from "@src/models/user/User"

export default interface IUserRepository {
    findAll(): Promise<User[]>
    find(email: string): Promise<User>
    save(user: User): Promise<void>,
    delete(): Promise<void>,
}