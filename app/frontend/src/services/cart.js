import { url } from "."
import { getCart, GetTimeCached, saveCart, saveTime } from "../Cache"
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
    saveCart([items[0]])
    return { datas:[items[0]],status:201}
    
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