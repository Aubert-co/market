import { getStorageStore, saveStorageStore } from "@/Storage/store.storage";
import { url } from ".";
import type { Response } from ".";
import type { Store } from "@/types/store.types";

export type CreateStore = {
  name: string;
  description: string;
  image: File;
}

export type ResponseGetStore = {
  status:number
  datas:Store[]
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
export const mockStore: Store[] = [{
  id: 1,
  name: "Super Loja Gamer",
  description: "A melhor loja de periféricos e jogos para PC e consoles.",
  photo: "https://via.placeholder.com/300x200?text=Super+Loja+Gamer"
}];

export const serviceGetStores = async():Promise<ResponseGetStore>=>{
    try{
        const getFromLocal = getStorageStore();
       
        if(getFromLocal.length !== 0){
          return {
            datas:getFromLocal as Store[],
            status:200,
          
          }
        }
       /* const response = await fetch(url+'/store/mystores',{
          credentials:'include'
        })
        if(!response.ok)throw new Error();
        const {datas} = await response.json()
        */
       const datas = mockStore
        if(Array.isArray(datas) && datas.length >0){
          saveStorageStore( datas as Store[] )
        }

        return {status:200 , datas:datas}
    }catch(err:any){
      return {status:500,datas:[]}
    }
}
