
import { getItemsFromCart, saveCart } from "@/Storage/cart"
import type { UserCart } from "@/types/cart.types"

type Response = {
    datas:UserCart[],
    status:number
}
export const userCartMocks: UserCart[] = [
  {
    id:1,
    productId: 1,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 2,
    storeId: 101,
    price: 49.99,
    stock: 10,
    name: "Fone Bluetooth"
  },
  {
    id:2,
    productId: 2,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 1,
    storeId: 102,
    price: 89.9,
    stock: 5,
    name: "Mouse Gamer RGB"
  },
  {
   id:3,
    productId: 3,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 3,
    storeId: 103,
    price: 199.99,
    stock: 8,
    name: "Teclado Mecânico"
  },
  {
    id:4,
    productId: 4,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 1,
    storeId: 104,
    price: 599.0,
    stock: 2,
    name: "Monitor 24'' Full HD"
  },
  {
    id:5,
    productId: 5,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 4,
    storeId: 105,
    price: 29.5,
    stock: 20,
    name: "Cabo HDMI 2m"
  }
];
export const getUserCart = async():Promise<Response>=>{
    const savedCart = getItemsFromCart()
    if( savedCart.cart.length >0){
        return {
            datas:savedCart.cart,status:200
        }
    }
 
    try{
        const datas = userCartMocks;
    if(Array.isArray( datas) && datas.length >0){
        saveCart( { cart: datas as UserCart[],updatedAt:Date.now()})
    }
    return {datas:datas as UserCart[],status:200}
    }catch(err:any){
        return {datas:[],status:500}
    }
}