import { screen } from "@testing-library/react";
import { getInputValue ,isAlphanumeric,getMultiInputValues,existValue, changeDisplayToNone,roundANumber} from "../Components/Utils";
import '@testing-library/jest-dom';

var newDiv

describe.only('roundANumber',()=>{
  it("when send ",()=>{
    expect(roundANumber(1.3)).toEqual(1)

  })
})
describe('changeDisplayToNone',()=>{
  beforeEach(()=>{
    newDiv = document.createElement('div');
    newDiv.classList.add('testClass');
    newDiv.textContent = 'Este é um novo elemento de teste';
    newDiv.style.display = 'block';
    document.body.appendChild(newDiv);
  })
  afterEach(() => {
    document.body.removeChild(newDiv);
  });

  it("should set the display property to none for the element",()=>{
    changeDisplayToNone('.testClass')
    expect(newDiv).toHaveStyle('display:none')
  })
  it("should not change the display property when an invalid selector is provided",()=>{
    changeDisplayToNone('testClass')
    expect(newDiv).toHaveStyle('display:block')
  })
  it("should keep the display property as none when it's already set to none",()=>{
    newDiv.style.display = "none"
    changeDisplayToNone('.testClass')
    expect(newDiv).toHaveStyle('display:none')
  })
})
describe('existValue',()=>{
 
  it("should return true when the value exists in the array",()=>{
    const array = [{id:31,name:'lucas'},{id:43,name:'jose'},{id:35,name:'sofia'}]
    const valueToFind = 31

    expect(existValue(array,valueToFind)).toBeTruthy()
  })
  it("should return false when the value is not in the array",()=>{
    const array = [{id:31,name:'lucas'},{id:43,name:'jose'},{id:35,name:'sofia'}]
    const valueToFind = 53

    expect(existValue(array,valueToFind)).toBeFalsy()
  })
  it("should return false when an invalid id is provided",()=>{
    const array = [{id:31,name:'lucas'},{id:43,name:'jose'},{id:35,name:'sofia'}]
    expect(existValue(array)).toBeFalsy()
  })
})

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


describe('isAlphanumeric', () => {
  it('should return true for a string with only letters', () => {
    expect(isAlphanumeric('abcABC')).toBe(true);
  });

  it('should return true for a string with only numbers', () => {
    expect(isAlphanumeric('123456')).toBe(true);
  });

  it('should return true for a string with both letters and numbers', () => {
    expect(isAlphanumeric('abc123ABC')).toBe(true);
  });

  it('should return false for a string with special characters', () => {
    expect(isAlphanumeric('abc123!')).toBe(false);
  });

  it('should return false for a string with spaces', () => {
    expect(isAlphanumeric('abc 123')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(isAlphanumeric('')).toBe(false);
  });

  it('should return false for a string with special characters only', () => {
    expect(isAlphanumeric('!@#$%^&')).toBe(false);
  });
});


describe('getMultiInputValues', () => {

  const mockRef = (value) => ({ current: { value } });

  test('should return an array of input values', () => {
      const ref1 = mockRef('input1');
      const ref2 = mockRef('input2');
      const ref3 = mockRef('input3');

      const result = getMultiInputValues(ref1, ref2, ref3);
      expect(result).toEqual(['input1', 'input2', 'input3']);
  });

  test('should return an empty string for a ref without a current property', () => {
      const ref1 = { current: null };
      const ref2 = mockRef('input2');

      const result = getMultiInputValues(ref1, ref2);
      expect(result).toEqual(['', 'input2']);
  });

  test('should handle empty ref arrays', () => {
      const result = getMultiInputValues();
      expect(result).toEqual([]);
  });

  test('should return an empty string for empty input values', () => {
      const ref1 = mockRef('');
      const ref2 = mockRef('input2');

      const result = getMultiInputValues(ref1, ref2);
      expect(result).toEqual(['', 'input2']);
  });

});