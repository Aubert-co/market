import request from 'supertest'
import app from '../../serve'
import jwt from 'jsonwebtoken'
import { products } from '../__mocks__/products';
import {users, cleanAllDb, createUserStoreAndProducts } from '../__mocks__';

if(!process.env.ACCESS_TOKEN)throw new Error();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN


const cookies  = jwt.sign({id:users[0].id},ACCESS_TOKEN )
const productIds = products.map((val)=>{
    return val.id
})
describe("Delete Products",()=>{
    beforeAll(async()=>{
        await cleanAllDb();
        await createUserStoreAndProducts()
        .catch((err)=>{throw new Error(err)})
    })
    afterAll(async()=>{
        await cleanAllDb()
    })
    it("should delete the products correctly when send all data correctly",async()=>{
       
        const response = await request(app)
        .delete('/products/delete')
        .set('Cookie', [`token=${cookies}`])
        .send({'storeId':1})
        .send({'productIds':productIds})

        expect(response.body.message).toEqual('Delete scheduled.')
        expect(response.statusCode).toBe(202)
     
    })
    it("should not delete the products when send a store that no belongs to the user",async()=>{
        const response = await request(app)
        .delete('/products/delete')
        .set('Cookie', [`token=${cookies}`])
        .send({'storeId':2})
        .send({'productIds':productIds})

        expect(response.statusCode).toBe(403)
        expect(response.body.message).toEqual('You do not have permission to access this store.')
       
       
        
    })
    it("should not delete the products when send an invalid array",async()=>{
        const response = await request(app)
        .delete('/products/delete')
        .set('Cookie', [`token=${cookies}`])
        .send({'storeId':1})
        .send({'productIds':'test'})

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toEqual('Invalid product IDs provided.')
    })
     it("should not delete the products when send an empty array",async()=>{
        const response = await request(app)
        .delete('/products/delete')
        .set('Cookie', [`token=${cookies}`])
        .send({'storeId':1})
        .send({'productIds':[]})

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toEqual('Invalid product IDs provided.')
    })
      it("should not delete the products when send an empty array",async()=>{
        const response = await request(app)
        .delete('/products/delete')
        .set('Cookie', [`token=${cookies}`])
        .send({'storeId':1})
        .send({'productIds':[1]})

        expect(response.statusCode).toBe(202)
        expect(response.body.message).toEqual('Delete scheduled.')
    })
})

