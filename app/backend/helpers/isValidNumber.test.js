const {isValidNumber} = require('./index')


const testCases = [
    [2,true],
    ['not',false],
    [3.3,false],
    ['3.3',false],
    ['11',true],
    [Infinity,false],
    ['e1',false],
    ['1e',false],
    [0,false],
    ['0',false],
    [0.1,false],
    [-1,false],
    ['0.1',false],
    [-0.1,false],
    [null,false],
    [undefined,false],
    ['',false]

]
describe.each(testCases)("Function isValidNumber",(a,expected)=>{
   it(`When the value is '${a}' should return ${expected}`,()=>{
        expect(isValidNumber(a)).toEqual(expected)
   })
})
