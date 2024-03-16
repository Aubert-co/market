const {generateWhereClause} = require('./index')
const {Op} = require('sequelize')

const defaultLimit = 25

describe("Tests the 'generateWhereClause' function which creates a WHERE clause for a Sequelize query.",()=>{

    it("Should return an object with category and name when provided with valid input and default to a limit of 5 when no limit is specified",()=>{
        const fixtures = {name:"thsirts",category:"shirt"}

        const expectedValue = generateWhereClause(fixtures)

        expect(expectedValue).toHaveProperty('where')
        
        const {where} = expectedValue

        expect(where).toHaveProperty('name')
        expect(where).toHaveProperty('category')
    

        expect(where.category).toEqual(fixtures.category)
        expect(where.name).toEqual({[Op.like]:fixtures.name})
   
        expect(where).not.toHaveProperty('color')
        
       
    })
    
    it("Should return an object with the specified name property when provided with a valid input",()=>{
        const fixtures ={name:"pants"}

        const expectedValue = generateWhereClause(fixtures)
        
        expect(expectedValue).toHaveProperty('where')
       
        const {where,limit} = expectedValue

        expect(where).toHaveProperty('name')
        expect(where.name).toEqual({[Op.like]:fixtures.name})
        expect(limit).toBeUndefined()
      

        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('color')
    })
    it("Should return an object with a specified category property when provided with a valid input",()=>{
        const fixtures ={category:"pants"}

        const expectedValue = generateWhereClause(fixtures)
        
        expect(expectedValue).toHaveProperty('where')
     
        const {where} = expectedValue

        expect(where).toHaveProperty('category')
        expect(where.category).toEqual(fixtures.category)
        
        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('color')
    })
    it("Should return an object with a specified color property  when provided with a valid input",()=>{
        const fixtures ={color:"gray"}

        const expectedValue = generateWhereClause(fixtures)
        
        expect(expectedValue).toHaveProperty('where')
      
        const {where} = expectedValue

        expect(where).toHaveProperty('color')
        
        expect(where.color).toBe(fixtures.color)
      

        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('name')
    })
    
    it("Should return an object with a specified low property when provided with a valid input",()=>{
        const fixtures = {low:45}
        const expectedValue = generateWhereClause(fixtures)

        expect(expectedValue).toHaveProperty('where')
     
        const {where} = expectedValue

        expect(where).toHaveProperty('price')
        expect(where.price[Op.lt]).toEqual(fixtures.low)

        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('color')
    
    })
    
    it("Should return an object with a specified high property when provided with a valid input",()=>{
        const fixtures = {high:55}
        const expectedValue = generateWhereClause(fixtures)

        expect(expectedValue).toHaveProperty('where')
      
        const {where} = expectedValue

        expect(where).toHaveProperty('price')
        expect(where.price[Op.between][0]).toBe(0)
        expect(where.price[Op.between][1]).toBe(fixtures.high)

        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('color')
    
    })
    it("Should return an object with specified 'low' and 'high' properties when provided with a valid input ",()=>{
        const fixtures = {low:10,high:45}
        const expectedValue = generateWhereClause(fixtures)

        expect(expectedValue).toHaveProperty('where')
       

        const {where} = expectedValue
        
        expect(where).toHaveProperty('price')
        expect(where.price[Op.between][0]).toBe(fixtures.low)
        expect(where.price[Op.between][1]).toBe(fixtures.high)
        
    })
    it("Should return a default limit of 5 and include only 'name', 'category', 'color', and 'price' properties in the returned object when sending a valid input different from 'name', 'category', 'color', and 'price'.",()=>{
        const fixtures = {nothing:45}
        const expectedValue = generateWhereClause(fixtures)

        expect(expectedValue).toHaveProperty('where')
       
        const {where} = expectedValue

        expect(where).not.toHaveProperty('name')
        expect(where).not.toHaveProperty('category')
        expect(where).not.toHaveProperty('color')
        expect(where).not.toHaveProperty(Object.entries(fixtures)[0][0])
        expect(where).not.toHaveProperty('limit')
    })
    

    it("Should return all categories provided, replacing the 'price' category with 'low' and 'high'.",()=>{
        const fixtures = {name:"shorts",price:35,color:"blue",category:"clothes",low:45,high:89,limit:25}
        const expectedValue = generateWhereClause( fixtures )
        
        expect(expectedValue).toHaveProperty('where')
        expect(expectedValue).toHaveProperty('limit')
        const {where,limit} = expectedValue
        
        expect(where).toHaveProperty('name')
        expect(where).toHaveProperty('color')
        expect(where).toHaveProperty('category')
        expect(where).toHaveProperty('price')
      
        
        expect(limit).toBe(defaultLimit)
        expect(where.name[Op.like]).toBe(fixtures.name)
        expect(where.category).toBe(fixtures.category)
        expect(where.color).toBe(fixtures.color)
        expect(where.price[Op.between][0]).toBe(fixtures.low)
        expect(where.price[Op.between][1]).toBe(fixtures.high)
    })
})
