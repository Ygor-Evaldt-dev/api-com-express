import { UserDto } from "@src/infra/repositories/user/UserDto";

export default interface IDb {
    users: UserDto[];
    products: any[];
}
