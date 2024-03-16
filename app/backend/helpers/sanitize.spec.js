const {sanitizeString} = require('./index')


describe('sanitizeString function', () => {
    test('should remove non-alphabetic characters from a string', () => {
        const input = "Exemplo123 de* string 456";
        const expectedOutput = "Exemplo de string ";
        expect(sanitizeString(input)).toBe(expectedOutput);
    });

    test('should handle empty string', () => {
        const input = "";
        expect(sanitizeString(input)).toBe(undefined);
    });

    test('should handle string with only alphabetic characters', () => {
        const input = "Example String";
        expect(sanitizeString(input)).toBe(input);
    });

    test('should handle string with only non-alphabetic characters', () => {
        const input = "123456!@#$%";
        expect(sanitizeString(input)).toBe("");
    });

    test('should handle string with leading and trailing non-alphabetic characters', () => {
        const input = "!@#$%Example String!@#$%";
        expect(sanitizeString(input)).toBe("Example String");
    });

    test('should handle string with non-alphabetic characters in between alphabetic characters', () => {
        const input = "Ex@mple St@ri!ng";
        expect(sanitizeString(input)).toBe("Exmple String");
    });

    test('should handle string with spaces', () => {
        const input = "Hello World";
        expect(sanitizeString(input)).toBe(input);
    });
});