const  headers ={'Content-Type':'application/json'}

export const serviceDecreaseCart = async({cart_id})=>{

}
export const serviceIncreaseCart = async({cart_id})=>{
    return {status:200}
}
export const addToCart = async({product_id,quantity})=>{
    try{

        const response= await fetch('localhost:8080/cart/create',{
            method:'POST',
            body:JSON.stringify({product_id,quantity}),
            headers
        })
        const json =await response.json()

        return {datas:[],status:json.status}
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
        const json =await response.json()

        return {datas:[],status:json.status}
    }catch(err){
        return {datas:[],status:500}
    }
}
export const serviceRemoveFromCart = async({product_id})=>{
    try{
        const response= await fetch('localhost:8080/cart/delete',{
            method:'POST',
            body:JSON.stringify({cart_id:product_id}),
            headers
        })
        const json =await response.json()

        return {datas:[],status:json.status}
    }catch(err){
        return {datas:[],status:500}
    }
}
export const serviceGetItems = async({body})=>{
    try{
        const response = await fetch('localhost:8080',{
            method:'POST',
            headers,
            body:JSON.stringify (body )
        })
        const {datas,status}  = response.json()
        
        return {datas,status}
    }catch(err){
        return {datas:[],status:404}
    }
}
export const serviceLogin = async({name,password})=>{

    try{
        const response = await fetch('localhost:8080/register',{
            method:'POST',
            body:JSON.stringify({name,password}),
            headers
        })
        const {status,message} = await response.json()
        return {status,message}
    }catch(err){
        return {status:500,message:'Algo deu errado!'}
      
    }
}
export const serviceRegister = async({name,password})=>{

    try{
        const response = await fetch('localhost:8080/register',{
            method:'POST',
            body:JSON.stringify({name,password}),
            headers
        })
        const {status,message} = await response.json()
        return {status,message} 
    }catch(err){
        return {message:'Algo deu errado!',status:500}
    }
}