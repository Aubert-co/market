export const getCart = ()=>JSON.parse( localStorage.getItem('cart')) || []

export const saveCart = (cart)=>{
  const value = JSON.stringify(cart)
  localStorage.setItem('cart',value)
}

export const cacheChangeQuantity = ({cart,quantity,id,deleted})=>{
  cart =getCart() || cart

 return cart.map((val)=>{
      if(id === val.id && val.quantity !== quantity){
        val.quantity= quantity
        val.saved = false
        console.log("here")
      }
     
      return val
  })
}
export const deleteItemCart = (id)=>{
  const cart = getCart()
  
  return cart.map((val)=>{
    if(id === val.id ){
      val.deleted = true
    }
    return val
  })
}
export const ClearAllCart = ()=>{
  const cart = getCart()
  cart.map((val)=>val.deleted = true)
  
  saveCart(cart)


}
export const GetTimeCached = ()=>JSON.parse(localStorage.getItem('times')) || {}
 
export const saveTime = ({typeItem,dateNow})=>{
  dateNow = dateNow ||  new Date().getTime();
  const getTimes = GetTimeCached() 
  getTimes[typeItem] = dateNow
  localStorage.setItem('times',JSON.stringify(getTimes))
}

