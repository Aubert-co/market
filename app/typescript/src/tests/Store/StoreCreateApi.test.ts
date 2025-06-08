import request from "supertest"
import * as FileUpload from "../../Services/FileUpload"
import app from "../../serve"
import path from "path"
import jwt from "jsonwebtoken"
import { prisma } from "../../lib/prima"

 if(!process.env.JWT_KEY)throw new Error();

const authorization  = jwt.sign({id:1},process.env.JWT_KEY )
const imagePath = path.resolve(__dirname, '../assets/image.jpeg');
   
describe("APi StoreCreate",()=>{
   
    it("Should return 'Acess denied' and status 401 when try to create a store withou login",async()=>{

        jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
        
        const response = await request(app)
        .post('/store/create')
        .field('name', 'Minha Loja')
        .field('description', 'Descrição da loja')
        .attach('image', imagePath); 
        
        expect(response.body.message).toEqual('Access Denied')
        expect(response.statusCode).toEqual(401)
    })
})

describe("StoreCreate DB actions",()=>{
    beforeAll(async ()=>{
        const data = { id:1,name:'lucas',password:'123456',email:'lucas@gmail.com'}
        const deleteStore =  prisma.store.deleteMany({
                    where:{
                        id:{
                             gt:0
                        }
                    }
            }) 
        const deleteUser= prisma.user.create({data})
            
        await Promise.all([deleteStore,deleteUser])
    })
     afterAll(async()=>{
         await prisma.store.deleteMany({
                    where:{
                        id:{
                             gt:0
                        }
                    }
            })
            await prisma.user.deleteMany({
                    where:{
                         id:{
                             gt:0
                        }
                    }
            })
     })
     it("test",async()=>{
        
        jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
        
        const response = await request(app)
        .post('/store/create')
        .set('Authorization', `Bearer ${authorization}`)
        .field('name', 'Minha Loja')
        .field('description', 'Descrição da loja')
        .attach('image', imagePath); 
        
        expect(response.body.message).toEqual('Store sucessfully created')
        expect(response.statusCode).toEqual(201)
       
    })
})