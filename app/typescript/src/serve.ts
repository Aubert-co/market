import express, { Express,Router,Request,Response } from 'express'


const app = express()


const route = Router()

app.use(express.json())


route.get('/',(req:Request , res:Response)=>{
    res.json({message:'Hellow world'})
})

app.use( route )

app.listen(8080,()=>{
    console.log('server running')
})