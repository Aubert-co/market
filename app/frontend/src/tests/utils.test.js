import { getInputValue } from "../Components/Utils";





    describe('getInputValue', () => {

        test('should return the value when ref is valid and has a value', () => {
          const mockRef = { current: { value: 'test value' } };
          const result = getInputValue(mockRef);
          expect(result).toBe('test value');
        });
      
        test('should return an empty string when ref is null', () => {
          const mockRef = null;
          const result = getInputValue(mockRef);
          expect(result).toBe('');
        });
      
        test('should return an empty string when ref.current is null', () => {
          const mockRef = { current: null };
          const result = getInputValue(mockRef);
          expect(result).toBe('');
        });
      
        test('should return an empty string when ref.current is undefined', () => {
          const mockRef = { current: undefined };
          const result = getInputValue(mockRef);
          expect(result).toBe('');
        });
      
        test('should return an empty string when ref is an empty object', () => {
          const mockRef = {};
          const result = getInputValue(mockRef);
          expect(result).toBe('');
        });
      
        test('should return the value when ref is valid and has a value', () => {
          const mockRef = { current: { value: 'test value' } };
          const result = getInputValue(mockRef);
          expect(result).toBe('test value');
        });
      
        test('should return an empty string when ref is null', () => {
          const mockRef = null;
          const result = getInputValue(mockRef);
          expect(result).toBe('');
        });
      
        test('should return an empty string when ref.current is null', () => {
          const mockRef = { current: null };
          const result = getInputValue(mockRef);
          expect(result).toBe('');
        });
      
        test('should return an empty string when ref.current is undefined', () => {
          const mockRef = { current: undefined };
          const result = getInputValue(mockRef);
          expect(result).toBe('');
        });
      
        test('should return an empty string when ref is an empty object', () => {
          const mockRef = {};
          const result = getInputValue(mockRef);
          expect(result).toBe('');
        });
      
});
