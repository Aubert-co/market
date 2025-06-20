import request from 'supertest'
import redis from '../../lib/redis'
import app from '../../serve'

describe("",()=>{
    beforeAll(async()=>{
        await redis.flushAll()
    })
    it("",async()=>{
        const response = await request(app)
        .get('/product/page')
    })
})