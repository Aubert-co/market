import { checkIsAValidNumber } from "../../Helpers"

describe("",()=>{
    it("check is a valid number",()=>{
        expect(checkIsAValidNumber('')).toBeFalsy()
        expect(checkIsAValidNumber(1)).toBeTruthy()
        expect(checkIsAValidNumber('1')).toBeTruthy()
        expect(checkIsAValidNumber(0)).toBeFalsy()
        expect(checkIsAValidNumber(1.5)).toBeTruthy()
        expect(checkIsAValidNumber(-1)).toBeFalsy()
        expect(checkIsAValidNumber('124e')).toBeFalsy()
      
        expect(checkIsAValidNumber(false)).toBeFalsy()
        expect(checkIsAValidNumber(true)).toBeFalsy()
        expect(checkIsAValidNumber(undefined)).toBeFalsy()
    })
})