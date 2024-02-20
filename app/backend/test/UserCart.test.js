const request = require('supertest');
const server = require('../serve');
const {Person,Cart,Store} = require('../models/index')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize');

require('dotenv').config()

const secret = process.env.SECRET_JWT
var app,token

const personData =  {id:10,name:"lucas",password:'1234567e'}
const itemStore = {id:5,color:'gray',name:"camisa",img_path:"eqeqe",img_name:"qwjeqe",category:"qwem",price:3}
const itemCart = {id:3,user_id:personData.id,product_id:itemStore.id,quantity:3}

describe("apis",()=>{
    beforeAll(async()=>{
        app =  server.listen(8084)
        try{
            await Promise.all([
                Person.create( personData ),
                Store.create( itemStore ),
                Cart.create(  itemCart )
            ])
            token = jwt.sign({user_id:personData.id},secret)
        }catch(err){
            console.error("before all"+err)
        }
    })

  
    describe("GET:cart",()=>{
        it("should return user's cart items",async()=>{
            const response = await request(app)
            .get('/cart/items')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            expect(response.body.message).toBe('sucess')
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('datas')
            
            const {id,quantity,product_id,user_id,store} = response.body.datas[0]
        
            expect(id).toEqual(itemCart.id)
            expect(quantity).toEqual(itemCart.quantity)
            expect(product_id).toEqual(itemCart.product_id)
            expect(user_id).toEqual(itemCart.user_id)

            expect(product_id).toEqual(itemStore.id)
            expect(store.color).toEqual(itemStore.color)
            expect(store.img_name).toEqual(itemStore.img_name)
            expect(store.category).toEqual(itemStore.category)
            expect(store.name).toEqual(itemStore.name)
            expect(store.img_path).toEqual(itemStore.img_path)
            expect(store.price).toEqual(itemStore.price)
    
        })
    })
    describe("PUT:cart/update",()=>{
        it("when send quantity equal 0 should throw an error and not update the cart",async()=>{
            const quantityToSend = 0
            const response =  await request(app)
            .put('/cart/edit')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({quantity:quantityToSend,cart_id:itemCart.id})

            expect(response.status).toBe(500)

            const {quantity,id} = await Cart.findOne({where:{id:itemCart.id}})

            expect(quantity).toEqual(itemCart.quantity)
            expect(id).toEqual(itemCart.id)
        
        })
        it("should update quantity in users cart",async()=>{
            itemCart.quantity = 5
            const response =  await request(app)
            .put('/cart/edit')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({quantity:itemCart.quantity,cart_id:itemCart.id})

            expect(response.status).toBe(201)

            const {quantity,id} = await Cart.findOne({where:{id:itemCart.id}})

            expect(quantity).toEqual(itemCart.quantity)
            expect(id).toEqual(itemCart.id)
        })
    })
    describe("DELETE:cart/delete",()=>{
        it("when cart id equal a 0 or smaller should return a error",async()=>{
            const cart_id = 0
            const response =  await request(app)
            .delete('/cart/delete')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({quantity:itemCart.quantity,cart_id})

            expect(response.status).toBe(500)

            const datas = await Cart.findOne({where:{id:itemCart.id}})

            expect( datas ).not.toBeNull()
        })
        it("should delete item from cart",async()=>{
            const response =  await request(app)
            .delete('/cart/delete')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({quantity:itemCart.quantity,cart_id:itemCart.id})

            expect(response.status).toBe(201)

            const datas = await Cart.findOne({where:{id:itemCart.id}})

            expect( datas ).toBeNull()
        })
    })
    describe("CREATE:cart",()=>{
        it("when send a product id that non existis",async()=>{
            const response =  await request(app)
            .post('/cart/create')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({product_id:10})

            expect(response.status).toBe(404)

            const cart = await Cart.findOne({where:{user_id:personData.id}})

            expect(cart).toBeNull()
        
        })
        it("should create a item cart",async()=>{
            const response =  await request(app)
            .post('/cart/create')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({product_id:itemStore.id})

            expect(response.status).toBe(201)

            const {quantity,product_id,user_id} = await Cart.findOne({where:{user_id:personData.id}})

            expect(quantity).toEqual(1)
            expect(product_id).toEqual(itemStore.id)
            expect(user_id).toEqual(personData.id)
        })
    })
  
   
   
    afterAll(async()=>{
        try{
            await Promise.all([
            Person.destroy({ where: { id: { [Op.gt]: 1 } } }),
            Store.destroy({ where: { id: { [Op.gt]: 1 } } }),
            Cart.destroy({ where: { user_id: { [Op.gt]: 1 } } })
            ])
            app.close()
        }catch(err){
            console.error("afterAll"+err)
        }
    })
})