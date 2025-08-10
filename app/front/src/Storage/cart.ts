
import type { UserCart } from "@/types/cart.types"

const CART_KEY = "cart-item"


type StorageCart = {
    cart:UserCart[],
    updatedAt:number,

}
export const getItemsFromCart = ():StorageCart =>{
    const values =  localStorage.getItem(CART_KEY) 
    if(values){
        return JSON.parse( values )
    }
    return {cart:[],updatedAt:0}
}

export const saveCart =({cart,updatedAt}:StorageCart)=>{

    const items = {cart,updatedAt}
    localStorage.setItem(CART_KEY,JSON.stringify( items ))
}

export const updateItemCart = (id:number,quantity:number)=>{
    const items = getItemsFromCart()
    if(items.cart.length === 0)return 

    const cart = items.cart.map((val)=>{
        if(val.id === id){
            return {...val,quantity}
        }
        return val
    })
    saveCart({cart,updatedAt:Date.now()})
}
export const removeItemFromCart = (id:number)=>{
    const items = getItemsFromCart()
    if(items.cart.length ===0)return;
  
        const cart = items.cart.map((val)=>{
            if(val.id === id){
                return {...val,isDeleted:true}
            }
            return val
        })
        
    saveCart({cart,updatedAt:Date.now()})
}