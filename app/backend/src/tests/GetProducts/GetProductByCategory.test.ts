import request from 'supertest'
import redis from '../../Lib/redis'
import app from '../../serve'
import { cleanAllDb, createUserStoreAndProducts } from '../__mocks__'
import { prisma } from '../../Lib/prima'



describe("db actions",()=>{
    beforeAll(async()=>{
        await cleanAllDb()
        await createUserStoreAndProducts()
    })
    beforeEach(async()=>{
       /* try{ 
            await redis.flushAll()
            
        }catch(err:any){
            throw new Error('Algo deu errado ao limpar o redis'+err.message)
        }*/
    })
    it("should retutn the datas from eletronicos",async()=>{
       /* const response = await request(app)
        .get('/')
        expect(response.body.status).toEqual(200)
        */
        })
})