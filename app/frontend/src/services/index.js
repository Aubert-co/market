const  headers ={'Content-Type':'application/json'}

export const serviceDecreaseCart = async({cart_id})=>{

}
export const serviceIncreaseCart = async({cart_id})=>{
    return {status:200}
}
export const addToCart = async({product_id,quantity})=>{
    try{

        const response= await fetch('http://localhost:8080/cart/create',{
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
export const serviceGetCart =async()=>{
    try{
        const token = localStorage.getItem('token')
        if(!token)return {datas:[],status:401}
        
        const response= await fetch('localhost:8080/cart/items',{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`}
        })
        return {datas:[],status:response.status}
    }catch(err){
        return {datas:[],status:500}
    }
}
export const serviceRemoveFromCart = async({product_id})=>{
    try{
        const response= await fetch('http://localhost:8080/cart/delete',{
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
        const response = await fetch('http://localhost:8080/',{
            method:'POST',
            headers,
            body:JSON.stringify (body )
        })
        const {datas}  = response.json()
        
        return {datas,status:response.status}
    }catch(err){
        return {datas:[],status:404}
    }
}
export const serviceLogin = async({name,password})=>{

    try{
        const response = await fetch('http://localhost:8080/login',{
            method:'POST',
            body:JSON.stringify({name,password}),
            headers
        })
        const {message,token} = await response.json()
       
        return {status:response.status,message,token}
    }catch(err){
       
        return {status:500,message:'Algo deu errado!'}
      
    }
}
export const serviceRegister = async({name,password})=>{

    try{
        const response = await fetch('http://localhost:8080/register',{
            method:'POST',
            body:JSON.stringify({name,password}),
            headers
        })
        const {message} = await response.json()
        return {status:response.status,message} 
    }catch(err){

        return {message:'Algo deu errado!',status:500}
    }
}
export const serviceStore = async()=>{
    try{
        const token = localStorage.getItem('token')
        console.log(token)
        if(!token)return {datas:[],status:401}
        
        const response= await fetch('http://localhost:8080/store/admin',{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`}
        })
        const json =await response.json()
    
        return {datas:json.datas,status:response.status}
    }catch(err){
        return {datas:[],status:500}
    }
}
export const serviceCreateStore = async(formData)=>{
    try{
        const token = localStorage.getItem('token')
      
        if(!token)return {datas:[],status:401}
        
        const response= await fetch('http://localhost:8080/store/create',{
            method:'POST',
            headers:{'Authorization':`Bearer ${token}`},
            body:formData
        })
        const json =await response.json()
      
        return {message:json.message,status:response.status}
    }catch(err){
       
        return {datas:[],status:500}
    }
}