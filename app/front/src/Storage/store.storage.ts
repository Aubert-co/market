import type { Store } from "@/types/store.types";

const KEY_STORE = "store-key"

export const getStorageStore  =():Store[]=>{
    const localStore = localStorage.getItem(KEY_STORE)
    if(localStore){
        return JSON.parse( localStore ) 
    }
    return [] as Store[];
}


export const saveStorageStore = (store:Store[]):void=>{
    localStorage.setItem( KEY_STORE , JSON.stringify( store ) )
}