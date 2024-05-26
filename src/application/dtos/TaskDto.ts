export default class TaskDto {
    constructor(
        readonly id: string,
        readonly titulo: string,
        readonly finalizada: boolean,
        readonly descricao?: string
    ) { }
}