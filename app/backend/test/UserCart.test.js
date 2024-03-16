const request = require('supertest');
const server = require('../serve');
const {Person,Cart,Store,Product} = require('../models/index')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize');
const {stores,itemStore,users} = require('./storefixtures')
require('dotenv').config()

const secret = process.env.SECRET_JWT
var app,token,cart_ids,quantity_cart
const [products] = itemStore
const [user] = users
const [store]= stores


describe("API CART",()=>{
    beforeAll(async()=>{
        app =  server.listen(8084)
        try{
            await Promise.all([
                Person.create( user ),
                Store.create( store ),
                Product.create(products)
            ])
            token = jwt.sign({user_id:user.id},secret)
        }catch(err){
         
            console.error("before all"+err)
        }
    })

    afterAll(async()=>{
        try{
            await Promise.all([
                Person.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Store.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Product.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Cart.destroy({where:{id:{[Op.gt]:0}}})
            ])
            app.close()
        }catch(err){
            console.error("afterAll"+err)
        }
    })
    
       
        it("Verifies successful creation of a new cart",async()=>{
            const response =  await request(app)
                .post('/cart/create')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({product_id:products.id})
            
            
            expect(response.status).toBe(201)
            const cart = await Cart.findOne({where:{user_id:user.id},include: { model: Product, as: 'product' }})
            cart_ids = cart.id
            const productInDB = await Product.findOne({where:{id:cart.product_id}})

            expect(cart.product_id).toEqual(products.id)
            expect(cart.quantity).toEqual(1)
            expect(cart.user_id).toEqual(user.id)
            
            expect(productInDB).not.toBeNull()

            quantity_cart = 1
        })
        it("When send a cart already exists should update the quantity in +1",async()=>{
            const response =  await request(app)
                .post('/cart/create')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({product_id:products.id})
            
            
            expect(response.status).toBe(201)
            const cart = await Cart.findOne({where:{user_id:user.id},include: { model: Product, as: 'product' }})
            
            expect(cart.quantity).toEqual(quantity_cart+=1)
           
            
        })
        it("Should not create a cart when sending incorrect product IDs",async()=>{
            const invalidProductId = 'e13'
            const response =  await request(app)
                .post('/cart/create')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({product_id:invalidProductId})
            
            
            expect(response.status).toBe(400)
            const cart = await Cart.findAll({where:{product_id:invalidProductId},include: { model: Product, as: 'product' }})

            expect(cart).toEqual([])

        })
    
        it("Should retrieve the items in the user's cart",async()=>{
            const response = await request(app)
                .get('/cart/items')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)

            expect(response.body.message).toBe('sucess')
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('datas')

            const {dataValues:cart} = await Cart.findOne({where:{user_id:user.id},include: { model: Product, as: 'product' }})
            
            const {id,quantity,product_id,user_id,product} = response.body.datas[0]
            
            expect(cart.product_id).toBe(product_id)
            expect(cart.quantity).toEqual(quantity)
            expect(cart.user_id).toEqual(user_id)
            expect(cart.id).toEqual(id)

            const productFromDB = await Product.findOne({where:{id:product.id}})

            expect(productFromDB.id).toBe(product.id)
            expect(productFromDB.store_id).toBe(product.store_id)
        })
        
       
        it("Should throw an error and not update the cart when quantity is zero",async()=>{
            const quantityToSend = 0
            const response =  await request(app)
                .put('/cart/edit')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({quantity:quantityToSend,cart_id:cart_ids,action:'decrease'})

            expect(response.status).toBe(400)

            const cart =await  Cart.findByPk(cart_ids)
            
            expect(cart.quantity).toEqual(quantity_cart)

        })
        it("Should throw an error and refrain from updating the cart when a negative quantity is sent",async()=>{
            const quantityToSend = -1
            const response =  await request(app)
                .put('/cart/edit')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({quantity:quantityToSend,cart_id:cart_ids,action:'decrease'})

            expect(response.status).toBe(400)

            const cart =await  Cart.findByPk(cart_ids)
            
            expect(cart.quantity).toEqual(quantity_cart)

        })
        it("When send an invalid action should return an error",async()=>{
            
            const response =  await request(app)
                .put('/cart/edit')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({quantity:1,cart_id:cart_ids,action:''})

            expect(response.status).toBe(400)

            const cart =await  Cart.findByPk(cart_ids)
            
            expect(cart.quantity).toEqual(quantity_cart)

        })
        it("When send an invalid action should return an error",async()=>{
            
            const response =  await request(app)
                .put('/cart/edit')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({quantity:1,cart_id:cart_ids,action:undefined})

            expect(response.status).toBe(400)

            const cart =await  Cart.findByPk(cart_ids)
            
            expect(cart.quantity).toEqual(quantity_cart)

        })
        it("When send an action different from decrease or increase shound return an error",async()=>{
            
            const response =  await request(app)
                .put('/cart/edit')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({quantity:1,cart_id:cart_ids,action:'not'})

            expect(response.status).toBe(400)

            const cart =await  Cart.findByPk(cart_ids)
            
            expect(cart.quantity).toEqual(quantity_cart)

        })
        it("Should update the cart quantity when sending a valid quantity with the 'increase' action",async()=>{
            const quantityToSend = 5
            quantity_cart +=5
            const response =  await request(app)
                .put('/cart/edit')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({quantity:quantityToSend,cart_id:cart_ids,action:'increase'})

            expect(response.status).toBe(201)

            const cart =await  Cart.findByPk(cart_ids)
            
            expect(cart.quantity).toEqual(quantity_cart)

        })
        it("Should update the cart quantity when sending a valid quantity with the 'decrease' action",async()=>{
            const quantityToSend = 4
            quantity_cart-=4
            const response =  await request(app)
                .put('/cart/edit')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({quantity:quantityToSend,cart_id:cart_ids,action:'decrease'})

            expect(response.status).toBe(201)

            const cart =await  Cart.findByPk(cart_ids)
            
            expect(cart.quantity).toEqual(quantity_cart)

        })
        it("when send quantity equal 0 and 'increase' action , should not updated the cart",async()=>{
       
            const response =  await request(app)
            .put('/cart/edit')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({quantity:0,cart_id:cart_ids,action:'increase'})

            expect(response.status).toBe(400)

            
            const cart =await  Cart.findByPk(cart_ids)
            
            expect(cart.quantity).toEqual(quantity_cart)
        
        })
        it("When send a value to 'decrease' greater than the current cart quantity ,the quantity should update to 0 ",async()=>{
            quantityToSend = 0
            const response =  await request(app)
                .put('/cart/edit')
                .set('Content-Type', 'application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({quantity:10,cart_id:cart_ids,action:'decrease'})

            expect(response.status).toBe(201)

            const cart =await  Cart.findByPk(cart_ids)
            
            expect(cart.quantity).toEqual(quantityToSend)

        })
      
    
        it("When cart_id equal a 0 should return a error",async()=>{
            const sendCart_id = 0
            const response =  await request(app)
            .delete('/cart/delete')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({cart_id:sendCart_id})

            expect(response.status).toBe(400)

            const datas  =await  Cart.findByPk(cart_ids)

            expect( datas ).not.toBeNull()
        })
        it("When cart_id equal a negative number should return a error",async()=>{
            const sendCart_id = -1
            const response =  await request(app)
            .delete('/cart/delete')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({cart_id:sendCart_id})

            expect(response.status).toBe(400)

            const datas  =await  Cart.findByPk(cart_ids)

            expect( datas ).not.toBeNull()
        })
        it("When cart_id equal a NaN number should return a error",async()=>{
            const sendCart_id = 'eu3y44'
            const response =  await request(app)
            .delete('/cart/delete')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({cart_id:sendCart_id})

            expect(response.status).toBe(400)

            const datas  =await  Cart.findByPk(cart_ids)

            expect( datas ).not.toBeNull()
        })
        
        
        it("When send a valid cart_id should delete the cart",async()=>{
            const response =  await request(app)
            .delete('/cart/delete')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({quantity:products.quantity,cart_id:products.id})

            expect(response.status).toBe(201)

            const datas = await Cart.findOne({where:{id:products.id}})

            expect( datas ).toBeNull()
        })
})