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

        expect(uuidV4).toBeDefined();
        expect(uuidV4.length).toBe(36);
    });
});