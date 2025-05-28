import { isAValidString } from "../../Helpers";


describe("function isAValidString",()=>{
    test("When the name is smaller than 4 or equal 4 should return false",()=>{
        expect(isAValidString('jose')).toBeFalsy()
    })
    test("When the name is a empty string should return false",()=>{
        expect(isAValidString("")).toBeFalsy()
    })
    test("When the name is null should return false",()=>{
        expect(isAValidString("")).toBeFalsy()
    })
    test("When the name is greater than 15 should return false",()=>{
        const name = "lriqknqkkqwenkqenkqen"
        expect( isAValidString(name)).toBeFalsy()
    })
    test("When the name is a type diferent from string should return false",()=>{
        expect( isAValidString(false)).toBeFalsy()
        expect( isAValidString(true)).toBeFalsy()
        expect( isAValidString(undefined)).toBeFalsy()
        expect(isAValidString(1234)).toBeFalsy()
        expect(isAValidString([])).toBeFalsy()
        expect(isAValidString({})).toBeFalsy()
    })
})