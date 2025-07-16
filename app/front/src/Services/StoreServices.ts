import { url } from "./";
import type { Response } from "./";

export type CreateStore = {
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
export type ResponseGetStore =Response & {
  store:Store[]
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
    return { message: 'Algo deu errado', status: 500 };
  }
};

export const serviceGetStores = async():Promise<ResponseGetStore>=>{
    try{
        const response = await fetch(url+'/store/mystores',{
            credentials:'include'
        })
        if(!response.ok)throw new Error();
        const {message,datas} = await response.json()
        console.log(message,datas)
        return {message,status:response.status , store:datas}
    }catch(err:any){
        return {message:'Algo deu errado',status:500,store:[]}
    }
}
