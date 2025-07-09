import type { Products } from "../Components/ListProducts"
import type { Pagination } from "../Pages/Home"

type FetchProducts = {
  setProducts:(params:{datas:Products,status:number})=>void;
  setPages:(params:Pagination)=>void;
  service:(pages:number)=>Promise<{datas:Products,status:number,currentPage:number,totalPages:number}>,
  pages:number,
}


export const fetchProducts = async({setPages,setProducts,service,pages}:FetchProducts)=>{
  try{
    const {datas,status,currentPage,totalPages} = await service(pages)
    setProducts({datas:datas,status})
    setPages({currentPage,totalPages})
  }catch(err){
    setProducts({datas:[] as Products,status:500})
    setPages({currentPage:1,totalPages:1})
  }
}