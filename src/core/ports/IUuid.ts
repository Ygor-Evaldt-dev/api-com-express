export default interface IUuid {
    generate(): string,
    validate(id: string): boolean
}