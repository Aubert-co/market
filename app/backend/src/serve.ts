import express, { Express,Router,Request,Response, RequestHandler, ErrorRequestHandler, NextFunction } from 'express'
import { ErrorMiddleware } from './Middleware/Error'
import cookieParser from 'cookie-parser'
import route from './Controller/Routes'
import cors from 'cors'
import { connectRedis } from './lib/redis'

const app = express()


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  
}));
app.use(cookieParser())
app.use(express.json())




app.use( route )
app.use((error:ErrorRequestHandler,req:Request,res:Response,next:NextFunction)=>ErrorMiddleware(error,req,res,next))

const startServer = async()=>{
    try {
        await connectRedis();
       
        if(process.env.MODE !== "test"){
            app.listen(8080,()=>{console.log('server running')});
        }
    } catch (err:any) {
        console.error('Erro ao iniciar servidor:', err);
        process.exit(1);
    }

}
startServer() 
export default app;