import request from 'supertest'
import * as FileUpload from "../../Repository/FileUpload"
import app from "../../serve"
import path from "path"
import jwt from "jsonwebtoken"
import { prisma } from "../../lib/prima"
import { deleteImages, generateImages } from "../assets/generate"

if(!process.env.ACCESS_TOKEN)throw new Error();

const cookies  = jwt.sign({id:1},process.env.ACCESS_TOKEN )
describe("When try to create a product with invalid name",()=>{
    beforeAll(async()=>{
        await generateImages()
    })
   
    it("should return 422 when the product name is '' ",async()=>{   
        jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', '')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','Eletrônicos')
        .attach('image', path.resolve(__dirname, '../assets/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid name. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product name is smaller than 4 ",async()=>{   
        jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abc')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','Eletrônicos')
        .attach('image', path.resolve(__dirname, '../assets/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid name. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
     it("should return 422 when the product name is greater than 15 ",async()=>{   
        jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'a'.repeat(16))
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','Eletrônicos')
        .attach('image', path.resolve(__dirname, '../assets/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid name. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
})

describe("When try to create a product with an invalid category",()=>{
     afterAll(async()=>{
        await deleteImages()
    })
    it("should return 422 when the product category is equal ''",async()=>{
        jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','')
        .attach('image', path.resolve(__dirname, '../assets/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid category. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product category is greater than 15",async()=>{
        jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','a'.repeat(16))
        .attach('image', path.resolve(__dirname, '../assets/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid category. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product category is smaller than 4",async()=>{
        jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")

        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','abc')
        .attach('image', path.resolve(__dirname, '../assets/image.jpg')); 

        expect(response.body.message).toEqual('Invalid category. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
})