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

export const getProducts = ()=> JSON.parse( localStorage.getItem('products') ) || []


export const verifyAndAdd =({products,page})=>{
  const storagedProducts = getProducts()
  if(storagedProducts.length === 0)return storagedProducts.push({products,page})

  return storagedProducts.map((val)=>{
    if(val.page===page)return {products,page}

    return val
  })

}
export const saveProducts = ({products,page})=>{
  const storagedProducts = verifyAndAdd({products,page})
  localStorage.setItem('products',JSON.stringify( storagedProducts))
} 