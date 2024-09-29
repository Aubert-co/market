import { screen } from "@testing-library/react";
import { getTotally,filterNotDeleteItems,getInputValue ,isAlphanumeric,getMultiInputValues,existValue, changeDisplayToNone,filterArray} from "../Components/Utils";
import '@testing-library/jest-dom';


describe("getTotally",()=>{
  it("Should sum the values in the array correctly.",()=>{
    const array  =[{id:3,name:'lucas',total:10},{id:2,name:'mat',total:25},{id:13,name:'lucas',total:15},{id:33,name:'jose',total:5}]
    
    expect( getTotally(array)).toEqual(55)
  })
  it("When the array has only one element, it should return the total of that item.",()=>{
    const array = [{id:3,total:10}]

    expect( getTotally( array )).toEqual(10)
  })
  it("When an empty array is sent, it should return 0.",()=>{
    const array = []

    expect( getTotally( array )).toEqual( 0 )
  })
  it("When the values in the array do not have the total key, it should return 0 instead.",()=>{
    const array = [{id:3},{id:5,total:10}]
    
    expect( getTotally(array)).toEqual(10)
  })

})
describe("filterNotDeleteItems",()=>{
  it("Should not include items marked as deleted in the array.",()=>{
    const array = [
      { id: 53, name: 'camisa', saved: false, quantity: 55 ,deleted:true},
      { id: 55, name: 'shorts', saved: false, quantity: 53 ,deleted:false},
      { id: 66, name: 'pantas', saved: false, quantity: 45 ,deleted:true},
      { id: 15, name: 'lorem', saved: false, quantity: 3 ,deleted:false}
    ];

    const newArray = filterNotDeleteItems( array )

    expect(newArray).toHaveLength(2)
    expect(newArray).not.toBe(array[0])
    expect(newArray).not.toBe(array[2])
    expect(newArray[0].id).toEqual(array[1].id)
    expect(newArray[1].id).toEqual(array[3].id)
    expect(newArray[0].saved).toBeTruthy()
    expect(newArray[1].saved).toBeTruthy()

  })
  it("Should return an empty array when all items are marked as deleted.",()=>{
    const array = [
      { id: 53, name: 'camisa', saved: false, quantity: 55 ,deleted:true},
      { id: 55, name: 'shorts', saved: false, quantity: 53 ,deleted:true},
      { id: 66, name: 'pantas', saved: false, quantity: 45 ,deleted:true},
      { id: 15, name: 'lorem', saved: false, quantity: 3 ,deleted:true}
    ];

    const newArray = filterNotDeleteItems( array )
    expect(newArray).toEqual([])

  })
  it("should return the original array when all items are marked as deleted: false.",()=>{
    const array = [
      { id: 53, name: 'camisa', saved: false, quantity: 55 ,deleted:false},
      { id: 55, name: 'shorts', saved: false, quantity: 53 ,deleted:false},
      { id: 66, name: 'pantas', saved: false, quantity: 45 ,deleted:false},
      { id: 15, name: 'lorem', saved: false, quantity: 3 ,deleted:false}
    ];

    const newArray = filterNotDeleteItems( array )
    expect(newArray).toHaveLength(4)
    newArray.map((val)=>{
      expect(val.saved).toBeTruthy()
      expect(val.deleted).toBeFalsy()
    })

  })
})
describe('filterArray',()=>{
  it("should filter out saved items and return array with id and quantity for non-deleted items", () => {
    const array = [
      { id: 53, name: 'camisa', saved: true, quantity: 55 },
      { id: 55, name: 'shorts', saved: false, quantity: 53 },
      { id: 66, name: 'pantas', saved: false, quantity: 45 },
      { id: 15, name: 'lorem', saved: false, quantity: 3 }
    ];

    const result = filterArray(array);

    expect(result).toEqual([
      { id: 55, quantity: 53 },
      { id: 66, quantity: 45 },
      { id: 15, quantity: 3 }
    ]);
  });

  it("should include 'deleted' flag for deleted items", () => {
    const array = [
      { id: 53, name: 'camisa', saved: true, quantity: 55 },
      { id: 55, name: 'shorts', saved: false, quantity: 53, deleted: true },
      { id: 66, name: 'pantas', saved: false, quantity: 45 },
      { id: 15, name: 'lorem', saved: false, quantity: 3 }
    ];

    const result = filterArray(array);

    expect(result).toEqual([
      {  id: 55, deleted: true},
      { id: 66, quantity: 45 },
      { id: 15, quantity: 3 }
    ]);
  });

  it("should return an empty array when all items are saved", () => {
    const array = [
      { id: 53, name: 'camisa', saved: true, quantity: 55 },
      { id: 55, name: 'shorts', saved: true, quantity: 53 },
      { id: 66, name: 'pantas', saved: true, quantity: 45 }
    ];

    const result = filterArray(array);

    expect(result).toEqual([]);
  });

  it("should return an empty array when the input array is empty", () => {
    const array = [];

    const result = filterArray(array);

    expect(result).toEqual([]);
  });
})
describe('changeDisplayToNone',()=>{
  let newDiv;
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