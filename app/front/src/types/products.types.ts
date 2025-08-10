export type Product ={
    name:string,
    price:number,
    id:number,
    imageUrl:string,
    category:string,
    stock:number,
    description:string
}
export type Comments = {
    content:string,
    name:string,
  
}
export type Rating = {
    _avg:{
        rating?:number
    },
    _count:{
        rating:number
    }
    
}
export type Reviews = {
    rating:number
}
export type SelectedProduct = {
    product:Product[],
    ratings:Rating,
    comments:Comments[],
    reviews:Reviews[]
    
}