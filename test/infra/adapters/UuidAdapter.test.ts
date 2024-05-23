import UuidAdapter from "@/infra/adapters/UuidAdapter";

describe("uuid adapter", () => {
    function makeSut() {
        const uuid = new UuidAdapter();
        return ({
            uuid
        });
    }

    test("should create a new uuid V4", () => {
        const { uuid } = makeSut();
        const uuidV4 = uuid.generate();

        const validUuidV4Length = 36;

        expect(uuidV4).toBeDefined();
        expect(uuidV4.length).toBe(validUuidV4Length);
    });

    test("should return true if valid uuid", () => {
        const { uuid } = makeSut();
        const uuidV4 = uuid.generate();

        expect(uuid.validate(uuidV4)).toBeTruthy();
    });

    test("should return false if invalid uuid", () => {
        const { uuid } = makeSut();
        const invalidUuidV4 = `${uuid.generate()}invalid`;

        expect(uuid.validate(invalidUuidV4)).toBeFalsy();
    });
});