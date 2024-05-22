import welcome from "@/index";

describe('index', () => {
    test('should test jest config', () => {
        const helloWorld: string = welcome("Mundo");
        expect(helloWorld).toBe('Olá Mundo');
    });
});