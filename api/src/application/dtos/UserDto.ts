export default class UserDto {
    readonly id: string
    readonly email: string
    readonly senha: string
    readonly telefone: string
    readonly nome_usuario: string

    constructor(
        id: string,
        email: string,
        senha: string,
        telefone: string,
        nome_usuario: string
    ) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.nome_usuario = nome_usuario;
    }
}