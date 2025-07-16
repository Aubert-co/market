import type { Products } from "../Components/ListProducts"
import { url,headers } from "./";
import type { Response } from "./";
type GetProducts = {
    datas:Products,
    status:number,
    currentPage:number,
    totalPages:number
}
type ParamsDeleteProduct= {
    productIds:Array<number>,
    storeId:number,
}
type ParamsCreateProduct = {
    price:string,
    stock:string,
    storeId:string,
    category:string,
    name: string;
    description: string;
    image: File;
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

export const serviceCreateProduct = async({
    name,price,stock,
    storeId,category,image,
    description
}:ParamsCreateProduct):Promise<Response>=>{
    try{
        const formData = new FormData()
        formData.append('name',name)
        formData.append('storeId',storeId)
        formData.append('category',category)
        formData.append('image',image)
        formData.append('price',price)
        formData.append('stock',stock)
        formData.append('description',description)
        const response = await fetch(url+'/product/create',{
            method:'POST',
            credentials:'include',
            body:formData
        })
        if(!response.ok)throw new Error()
        const  {message}= await response.json()
        return {message,status:response.status}
    }catch(err:any){
        return {message:'Algo deu errado',status:500}
    }
}


export const serviceGetAdminProducts = async(storeId:number):Promise<GetProducts & Response>=>{
    try{
        const response = await fetch(url+'/admin/store/products',{
            method:'POST',
            headers,
            credentials:'include',
            body:JSON.stringify({storeId,page:1})
        })
        if(!response.ok)throw new Error()
        const {datas,currentPage,totalPages,message } = await response.json()
        return {datas,status:response.status,currentPage,totalPages,message}
    }catch(err:any){
        console.log(err)
        return {datas:[],status:500,currentPage:0,totalPages:0,message:'Error'}
    }
}


export const deleteProduct = async({productIds,storeId}:ParamsDeleteProduct):Promise<Response>=>{
    try{
        const response = await fetch(url+'/products/delete',{
            credentials:'include',
            method:'DELETE',
            body:JSON.stringify({productIds,storeId}),
            headers
        })
        if(!response.ok)throw new Error();
        const {message} = await response.json()
        return {message,status:response.status}
    }catch(err:any){
        return {message:'Algo deu errado',status:500}
    }
}