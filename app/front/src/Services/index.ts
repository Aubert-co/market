export const  headers ={'Content-Type':'application/json'}
export const url = "http://localhost:8080"

export const loadImage = (imageName:string)=>url+`/images/${imageName}`



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
        console.log(message)
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
            headers,
            credentials:'include'
            
        })
        if(!response.ok)throw new Error();
        const {message} = await response.json()
        return {status:response.status,message} 
    }catch(err:unknown){
        return {message:'Algo deu errado!',status:500}
    }
}

type UsableFetch<T> = {
    setDatas:(args:{datas:T,status:number})=>void,
    service:()=>Promise<{datas:T,status:number}>,
}
export const usableFetch =async <T> ({setDatas,service}:UsableFetch<T>)=>{
    try{
        const {datas,status} = await service()
        setDatas({datas,status})
    }catch(err:any){
        setDatas({datas:[] as any,status:0})
    }
}







