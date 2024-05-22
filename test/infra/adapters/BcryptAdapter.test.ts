import BcryptAdapter from "@/infra/adapters/BcryptAdapter";

describe('bcrypt adapter', () => {
    test('should encrypt password', async () => {
        const encrypter = new BcryptAdapter();
        const encriptedPassword = await encrypter.encrypt('Anyp@ssword3');
        expect(encriptedPassword).toBeDefined();
    });

    test('should return true if is correct password', async () => {
        const encrypter = new BcryptAdapter();

        const hash = '$2b$12$FQ.ykNxRrwoBJf6hSNHYF.qCfE0.UwZVADzvqp0Gnfpb8LIOTcWga';
        const password = 'Anyp@ssword3';
        const result = await encrypter.compare(password, hash);

        expect(result).toBeTruthy();
    });
});