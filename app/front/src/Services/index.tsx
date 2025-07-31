const  headers ={'Content-Type':'application/json'}
export const url = "http://localhost:8080"

export type Response ={
    message:string,
    status:number
}

export const serviceRegister = async(datas:{email:string,name:string,password:string}):Promise<Response >=>{
  
    try{
        const response = await fetch(url+'/register',{
            method:'POST',
            body:JSON.stringify({email:datas.email,name:datas.name,password:datas.password}),
            headers
        })
       
        if(!response.ok)throw new Error(`${response.status}`);
        const {message} = await response.json()
        return {status:response.status,message} 
    }catch(err:unknown){
        let status = 500;
        if (err instanceof Error) {
            const parsedStatus = Number(err.message);
            if (!isNaN(parsedStatus)) {
                status = parsedStatus;
            }
        }
        return {
            message: "Algo deu errado!",
            status,
        };
    }
}
export const serviceLogin = async(datas:{email:string,password:string}):Promise<Response >=>{

    try{
        const response = await fetch(url+'/login',{
            method:'POST',
            body:JSON.stringify({email:datas.email,password:datas.password}),
            headers
        })
        if(!response.ok)throw new Error();
        const {message} = await response.json()
        return {status:response.status,message} 
    }catch(err:unknown){
        return {message:'Algo deu errado!',status:500}
    }
}