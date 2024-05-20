import { UserDto } from "@src/shared/dtos/UserDto";

export default interface IDb {
    users: UserDto[];
    products: any[];
}
