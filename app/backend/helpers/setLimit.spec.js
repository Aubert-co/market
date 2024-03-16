const {setLimit} = require('./index')
const defaultLimit = 5
const maximumLimit = 25
describe("Tests for the setLimit function",()=>{
    it("Should return a default limit of 5 when no limit is provided or when limit is equal to 0",()=>{
        const limit = 0
        const expectedValue = setLimit( limit )

        expect( expectedValue ).toBe(defaultLimit)
    })
    it("Should return the limit value when a valid limit is provided.",()=>{
        const limit = 8
        const expectedValue = setLimit( limit )

        expect(expectedValue).toBe(limit)
    })
    it("Should return the maximum limit of 25 when a limit greater than 25 is provided.",()=>{
        const limit = 55
        const expectedValue = setLimit( limit )

        expect( expectedValue ).toBe( maximumLimit )
    })
    it("Should return a default limit when a non-numeric value is sent as the limit parameter.",()=>{
        const limit = 'A55'
        const expectedValue = setLimit( limit )

        expect( expectedValue ).toBe( defaultLimit )
    })
    it("When no limit is sent, should return the default limit of 5.",()=>{
        const expectedValue = setLimit(  )

        expect( expectedValue ).toBe( defaultLimit )
    })
})

