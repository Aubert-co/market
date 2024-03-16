const request = require('supertest');
const server = require('../serve');
const {Product} = require('../models/index')
const {Op} = require('sequelize')
const {itemStore,defaultLimit,maximumLimit} = require('./storefixtures')
require('dotenv')
var app


describe("POST/products/search",()=>{
    beforeAll(async()=>{
        try{
            app =  server.listen(8088)
            await Product.bulkCreate(itemStore)
        }catch(err){
            console.log(err)
            throw err
        }
    })
    it("Should return random items when not sending any category, name, price, color.",async()=>{
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
       
    })
    it("Should return only items with the category 'shoes' when this category is specified.",async()=>{
        const body = {category:"shoes"}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

 
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        const {datas} = response.body
        
        datas.map((val)=>{
            itemStore.filter((item)=>{
                if(item.id === val.id && item.category === body.category){
                    expect(val.name).toBe(item.name)
                    expect(val.category).toBe(item.category)
                    expect(val.color).toBe(item.color)
                    expect(val.price).toBe(item.price)
                }
            })
        })
        datas.map((val)=>{expect(val.category).toBe(body.category)})
        
    })
    
   
   
  
    it("Should only return items with the name 'tshirt' and category 'clothes' when these search parameters are sent.",async()=>{
        const body = {category:"clothes",name:"tshirt"}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        const {datas} = response.body
        
        const filteritemStore = itemStore.filter((item)=>item.name ===body.name && item.category === body.category)
        expect(datas).toHaveLength(filteritemStore.length)
        datas.map((val)=>{
            itemStore.filter((item)=>{
                if(item.id === val.id && item.category === body.category && body.name === item.name){
                    expect(val.name).toBe(item.name)
                    expect(val.category).toBe(item.category)
                    expect(val.color).toBe(item.color)
                    expect(val.price).toBe(item.price)
                }
            })
        })
        datas.map((val)=>{
            expect(val.category).toBe(body.category)
            expect(val.name).toBe(body.name)
        })
        
    
    })
   
   

    it("Should only return items with a color equal to 'gray'.",async()=>{
        const body = {color:"gray"}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')

        const {datas} = response.body
        
        datas.map((val)=>{
            itemStore.filter((item)=>{
                if(item.id ===val.id){
                    expect(item.name).toBe(val.name)
                    expect(item.price).toBe(val.price)
                    expect(item.category).toBe(val.category)
                    expect(item.color).toBe(val.color)
                }
            })
            expect(val.color).toBe(body.color)
        })
        expect(datas.length).toBeLessThanOrEqual(defaultLimit)
       
    })
    it("Should only return items with a name equal to 'tshirt'.",async()=>{
        const body = {name:"tshirt"}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')

        const {datas} = response.body
        
        datas.map((val)=>{
            itemStore.filter((item)=>{
                if(item.id ===val.id){
                    expect(item.name).toBe(val.name)
                    expect(item.price).toBe(val.price)
                    expect(item.category).toBe(val.category)
                    expect(item.color).toBe(val.color)
                }
            })
            expect(val.name).toBe(body.name)
        })
        expect(datas.length).toBeLessThanOrEqual(defaultLimit)
       
    })
    it("If a valid name is sent, but an invalid low price is sent, the API should not return any items.",async()=>{
        const body = {name:"tshirt",low:1}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        const {datas} = response.body

      
        expect(datas).toHaveLength(0)
       
       
    })
    it("Should return nothing when a name that exists, a price that doesn't exist, and a category that exists are sent.",async()=>{
        const body = {name:"tshirt",price:79,category:"shoes"}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')

        const {datas} = response.body

     
        expect(datas).toHaveLength(0)
       
       
    })
   it("Should return nothing when a name that exists, a price that doesn't exist, a color, and a category that exist are sent.",async()=>{
        const body = {name:"tshirt",price:79,category:"shoes",color:"gray"}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')

        const {datas} = response.body
        
        expect(datas).toHaveLength(0)
      
      
    })
    
})




describe("POST/products/search testing price",()=>{
  
    it("Should only return items with a price between 5 and 35.",async()=>{
        const body = {high:35,low:5}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')

        const {datas} = response.body
        
        datas.map((val)=>{
            itemStore.filter((item)=>{
                if(item.id === val.id){
                    expect(item.name).toBe(val.name)
                    expect(item.price).toBe(val.price)
                    expect(item.category).toBe(val.category)
                    expect(item.color).toBe(val.color)
                    
                }
            })
            expect(val.price).toBeGreaterThan(body.low)
            expect(val.price).toBeLessThanOrEqual(body.high)
            expect(val.price).not.toBeGreaterThan(body.high)
            expect(val.price).not.toBeLessThan(body.low)
        })
        expect(datas.length).toBeLessThanOrEqual(25)
    })
    it("Should only return items with a price lower than 45 and a maximum limit of 25 items.",async()=>{
        const body = {low:46,limit:45}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')

        const {datas} = response.body
       
        datas.map((val)=>{
            expect(val.price).toBeLessThan(body.low)
            expect(val.price).not.toBeGreaterThan(body.low)
        })
       
        expect(datas.length).toBeLessThanOrEqual(25)
    })
    it("Should only return items with a price greater than 35.",async()=>{
        const body = {high:35}
        const response = await request(app)
        .post('/products/search')
        .set('Content-Type', 'application/json')
        .send(body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')

        const {datas} = response.body
       
        datas.map((val)=>{
            itemStore.filter((item)=>{
                if(item.id === val.id){
                    expect(val.name).toBe(item.name)
                    expect(val.price).toBe(item.price)
                    expect(val.category).toBe(item.category)
                    expect(val.color).toBe(item.color)
                }
            })
          
            expect(val.price).toBeLessThanOrEqual(body.high)
        })
    
         expect(datas.length).toBeLessThanOrEqual(25)
       
    })
    afterAll(async()=>{
        try{
           await Product.destroy({ where: { id: { [Op.gt]: 0 } } })
        }catch(err){
            console.error(err)
            throw err
        }
    })

})