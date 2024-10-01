export const serviceAdmStore = async()=>{
    try{
        const token = localStorage.getItem('token')
      
        if(!token)return {datas:[],status:401}
        
        const response= await fetch(url+'/store/create',{
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

export const serviceStore = async()=>{
    try{
        const token = localStorage.getItem('token')
        console.log(token)
        if(!token)return {datas:[],status:401}
        
        const response= await fetch(url+'/store/admin',{
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
        
        const response= await fetch(url+'/store/create',{
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