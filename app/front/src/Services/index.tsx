import type { Products } from "../Components/ListProducts"


const  headers ={'Content-Type':'application/json'}
export const url = "http://localhost:8080"

export const imageUrl = (imageName:string)=>url+`/images/${imageName}`
type GetProducts = {
    datas:Products,
    status:number,
    currentPage:number,
    totalPages:number
}
type CreateStore = {
  name: string;
  description: string;
  image: File;
}
export type Store = {
    name:string,
    description:string,
    photo:string,
    id:number
}
export type Response ={
    message:string,
    status:number
}
export type ResponeGetStore =Response & {
    store:Store[]
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

export const serviceGetProducts = async(pageNumber:number):Promise<GetProducts>=>{
    try{
        const response = await fetch(url+`/product/page/${pageNumber}`,{
            credentials:'include'
        })
        if(!response.ok)throw new Error();
        const {datas,currentPage,totalPages} = await response.json()
        return {datas,currentPage,totalPages,status:response.status}
    }catch(err:unknown){
        throw new Error();
    }
}


export const serviceCreateStore = async ({ name, description, image }: CreateStore) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    const response = await fetch(url + '/store/create', {
      method: 'POST',
      body: formData,
      credentials: 'include',
      
    });

    if (!response.ok) throw new Error();

    const data = await response.json();
    console.log('success');
    return { message: data.message, status: response.status };
  } catch (err: unknown) {
    console.log('error', err);
    return { message: 'Something went wrong', status: 500 };
  }
};
export const serviceGetStores = async():Promise<ResponeGetStore>=>{
    try{
        const response = await fetch(url+'/store/mystores',{
            credentials:'include'
        })
        const {message,datas} = await response.json()
        console.log(message,datas)
        return {message,status:response.status , store:datas}
    }catch(err:any){
        return {message:'Algo deu errado',status:500,store:[]}
    }
}
