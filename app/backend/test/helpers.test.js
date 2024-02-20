const {createWhere,setLimit} = require('../helpers/index')
const {Op} = require('sequelize')

const defaultLimit = 5
const maximumLimit = 25
describe("Tests the 'createWhere' function which creates a WHERE clause for a Sequelize query.",()=>{

    it("Should return an object with category and name when provided with valid input and default to a limit of 5 when no limit is specified",()=>{
        const objs = {name:"thsirts",category:"shirt"}

        const func = createWhere(objs)

        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func

        expect(where).toHaveProperty('name')
        expect(where).toHaveProperty('category')
    

        expect(where.category).toBe(objs.category)
        expect(where.name).toBe(objs.name)
        expect(where).not.toHaveProperty('price')
        expect(where).not.toHaveProperty('color')
        expect(limit).toEqual(defaultLimit)
       
    })
    it("Should return an empty object when no input is provided and the limit is set to the default of 5.",()=>{
        const objs = {}
        const func = createWhere(objs)

        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func

        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('price')
        expect(where).not.toHaveProperty('color')

        expect(func).toHaveProperty('limit')
        expect(limit).toBe(defaultLimit)
    })
    it("Should return an object with the specified name property when provided with a valid input and default limit of 5",()=>{
        const objs ={name:"pants"}

        const func = createWhere(objs)
        
        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func

        expect(where).toHaveProperty('name')
        expect(where.name).toBe(objs.name)
        expect(limit).toBe(defaultLimit)

        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('price')
        expect(where).not.toHaveProperty('color')
    })
    it("Should return an object with a specified category property when provided with a valid input and default limit of 5",()=>{
        const objs ={category:"pants"}

        const func = createWhere(objs)
        
        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func

        expect(where).toHaveProperty('category')
        expect(where.category).toBe(objs.category)
        expect(limit).toBe(defaultLimit)
        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('price')
        expect(where).not.toHaveProperty('color')
    })
    it("Should return an object with a specified color property  when provided with a valid input and default limit of 5",()=>{
        const objs ={color:"gray"}

        const func = createWhere(objs)
        
        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func

        expect(where).toHaveProperty('color')
        expect(func).toHaveProperty('limit')
        expect(where.color).toBe(objs.color)
        expect(limit).toBe(defaultLimit)

        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('price')
        expect(where).not.toHaveProperty('name')
    })
    it("Should return an object with a specified price property when provided with a valid input and default limit of 5",()=>{
        const objs ={price:35}

        const func = createWhere(objs)

        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func

        expect(where).toHaveProperty('price')
        expect(func).toHaveProperty('limit')
        expect(where.price).toBe(objs.price)
        expect(limit).toBe( defaultLimit )

        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('color')
    })
    it("Should return an object with a specified low property when provided with a valid input and default limit of 5",()=>{
        const objs = {low:45}
        const func = createWhere(objs)

        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func

        expect(where).toHaveProperty('price')
        expect(where.price[Op.lt]).toBe(objs.low)

        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('color')
        expect(limit).toBe(defaultLimit)
    })
    it("Should return an object with a specified high property when provided with a valid input and default limit of 5",()=>{
        const objs = {high:55}
        const func = createWhere(objs)

        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func

        expect(where).toHaveProperty('price')
        expect(where.price[Op.gt]).toBe(objs.high)

        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('color')
        expect(limit).toBe(defaultLimit)
    })
    it("Should return an object with specified 'low' and 'high' properties when provided with a valid input and default limit of 5",()=>{
        const objs = {low:10,high:45}
        const func = createWhere(objs)

        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')

        const {where,limit} = func
        
        expect(where).toHaveProperty('price')
        expect(where.price[Op.between][0]).toBe(objs.low)
        expect(where.price[Op.between][1]).toBe(objs.high)
        expect(limit).toBe(defaultLimit)
    })
    it("Should return a default limit of 5 and include only 'name', 'category', 'color', and 'price' properties in the returned object when sending a valid input different from 'name', 'category', 'color', and 'price'.",()=>{
        const objs = {nothing:45}
        const func = createWhere(objs)

        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func

        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('color')
        expect(where).not.toHaveProperty('price')
        expect(where).not.toHaveProperty(Object.entries(objs)[0][0])
        expect(limit).toBe(defaultLimit)
    })
    it("Should return the default maximum limit when sending a limit greater than 25",()=>{
        const objs = {limit:50}
        const func = createWhere(objs)

        expect(func).toHaveProperty('limit')
        expect(func).toHaveProperty('where')

        expect(func.limit).toBe(maximumLimit)
        expect(func.limit).not.toBe(objs.limit)
    })
    it("Should return all categories provided, replacing the 'price' category with 'low' and 'high'.",()=>{
        const objs = {name:"shorts",price:35,color:"blue",category:"clothes",low:45,high:89,limit:15}
        const func = createWhere( objs )
        
        expect(func).toHaveProperty('where')
        expect(func).toHaveProperty('limit')
        const {where,limit} = func
        
        expect(where).toHaveProperty('name')
        expect(where).toHaveProperty('color')
        expect(where).toHaveProperty('category')
        expect(where).toHaveProperty('price')

        expect(limit).toBe(objs.limit)
        expect(where.name).toBe(objs.name)
        expect(where.category).toBe(objs.category)
        expect(where.color).toBe(objs.color)
        expect(where.price[Op.between][0]).toBe(objs.low)
        expect(where.price[Op.between][1]).toBe(objs.high)
    })
})

describe("Tests for the setLimit function",()=>{
    it("Should return a default limit of 5 when no limit is provided or when limit is equal to 0",()=>{
        const limit = 0
        const func = setLimit( limit )

        expect( func ).toBe(defaultLimit)
    })
    it("Should return the limit value when a valid limit is provided.",()=>{
        const limit = 8
        const func = setLimit( limit )

        expect(func).toBe(limit)
    })
    it("Should return the maximum limit of 25 when a limit greater than 25 is provided.",()=>{
        const limit = 55
        const func = setLimit( limit )

        expect( func ).toBe( maximumLimit )
    })
    it("Should return a default limit when a non-numeric value is sent as the limit parameter.",()=>{
        const limit = 'A55'
        const func = setLimit( limit )

        expect( func ).toBe( defaultLimit )
    })
    it("When no limit is sent, should return the default limit of 5.",()=>{
        const func = setLimit(  )

        expect( func ).toBe( defaultLimit )
    })
})

