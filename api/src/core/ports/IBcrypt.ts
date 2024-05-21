export default interface IBcrypt {
    hash(password: string): Promise<string>;
    hashSync(password: string): string;
    compare(password: string, hash: string): Promise<boolean>
}