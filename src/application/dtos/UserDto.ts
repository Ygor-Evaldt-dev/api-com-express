export default class UserDto {
    constructor(
        readonly id: string,
        readonly email: string,
        readonly senha: string,
        readonly telefone: string,
        readonly nome_usuario: string
    ) { }
}