import { getProducts, saveProducts, saveTime } from "../Cache"

const  headers ={'Content-Type':'application/json'}
export const url = "http://localhost:8080"
export const serviceDecreaseCart = async({cart_id})=>{

}
export const serviceIncreaseCart = async({cart_id})=>{
    return {status:200}
}
export const addToCart = async({product_id,quantity})=>{
    try{

        const response= await fetch(url+`/cart/create`,{
            method:'POST',
            body:JSON.stringify({product_id,quantity}),
            headers
        })
        const json =await response.json()

        return {datas:[],status:response.status}
    }catch(err){
        return {datas:[],status:500}
    }
}

export const serviceRemoveFromCart = async({product_id})=>{

    
    try{
        const response= await fetch(url+'/cart/delete',{
            method:'POST',
            body:JSON.stringify({cart_id:product_id}),
            headers
        })
        const json =await response.json()

        return {datas:[],status:response.status}
    }catch(err){
        return {datas:[],status:500}
    }
}
export const serviceGetItems = async({body})=>{
    try{
        
        const response = await fetch(url+'/',{
            method:'POST',
            headers,
            body:JSON.stringify (body )
        })
        const {datas}  = response.json()
        saveTime({typeItem:"products"})
        saveProducts({products:datas,page:datas.page})
        return {datas,status:response.status}
    }catch(err){
        return {datas:[],status:404}
    }
}
export const serviceLogin = async({name,password})=>{

    try{
        const response = await fetch(url+'/login',{
            method:'POST',
            body:JSON.stringify({name,password}),
            headers
        })
        const {message,token} = await response.json()
        if(token){
            localStorage.setItem('token',token)
        }
        return {status:response.status,message,token}
    }catch(err){
       
        return {status:500,message:'Algo deu errado!'}
      
    }
}
export const serviceRegister = async({name,password})=>{

    try{
        const response = await fetch(url+'/register',{
            method:'POST',
            body:JSON.stringify({name,password}),
            headers
        })
        if(!response.ok)throw new Error();
        const {message} = await response.json()
        return {status:response.status,message} 
    }catch(err){
        return {message:'Algo deu errado!',status:500}
    }
}




export const serviceGetProduct = async({product_id})=>{
    try{
        if(!product_id || typeof product_id !=='number')return {datas:[],status:401}
        
             
        
        const response= await fetch(url+`/products/info/${product_id}`)
        const json =await response.json()
    
        return {message:json.message,status:response.status}
    }catch(err){
       
        return {datas:[],status:500}
    } 
}