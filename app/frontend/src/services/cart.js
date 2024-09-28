import { url } from "./index"
import { getCart, GetTimeCached, saveCart, saveTime } from "../Cache"
import { filterArray, filterNotDeleteItems } from "../Components/Utils";
import { items } from "../tests/fixtures";

export const serviceGetCart = async () => {
    const time = GetTimeCached();
    const date = new Date().getTime();
    const cacheDuration = 1000 * 60 * 10; 
  
    if (time['cart'] && date < time['cart'] + cacheDuration) {
        const datas = getCart();  
    
        return { datas, status: 201 }; 
    }
    saveTime({typeItem:'cart'})
    saveCart(items)
    return { datas:items,status:201}
    
    try {
        const token = localStorage.getItem('token');
     
        if (!token) return { datas: [], status: 401 };

        const response = await fetch(url + '/cart/items', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok && response.status === 201) { 
            const datas = await response.json();  
            saveTime({typeItem:'cart'})
            saveCart(datas)
            return { datas, status: 201 };  
        }

        return { datas: [], status: response.status }; 
    } catch (err) {
      
        return { datas: [], status: 500 }; 
    }
};

export const serviceUpdateCart = async()=>{
    
 
    const token =localStorage.getItem('token')
    if(!token)return {status:401}

    const cart = getCart();
    const newArray = filterArray(cart);
    
    if(newArray.length ===0 )return 
    
    try{
    const response= await fetch(url+'/cart/changes',{
        method:'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newArray)
    })
    
    if(response.ok && response.status === 201){
        
        const savedItems = filterNotDeleteItems( cart )
     
        saveCart(savedItems)
     
        return {status:201}
    }
   
    return {status:504}
}catch(err){
    return {status:504}
}
}