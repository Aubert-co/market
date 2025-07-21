import request from 'supertest'
import app from '../../serve'
import { cleanAllDb, cleanUserCart, createUserStoreAndProducts ,users} from '../__mocks__'
import { products } from '../__mocks__/products'
import jwt from "jsonwebtoken"
const [user1,user2] = users

if(!process.env.ACCESS_TOKEN)throw new Error();

const cookies  = jwt.sign({id:user2.id},process.env.ACCESS_TOKEN )
describe("db actions",()=>{
    beforeAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
        await createUserStoreAndProducts()
        
    })
    afterAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
    })
    it("should correctly add a item to a user cart",async()=>{
        const response =await request(app)
        .post('/user/cart/add')
        .set('Cookie', [`token=${cookies}`])
        .send({productId:products[0].id,quantity:1})
        expect(response.body.message).toBe('Sucess')
        expect(response.statusCode).toEqual(201)
    })
})