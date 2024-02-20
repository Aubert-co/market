const {Op} = require('sequelize')
const setLimit = (limit)=>{
    limit = isNaN(limit) ? 5 : Math.min(Number(limit), 25);
   return limit = limit ===0 ? 5 :limit
}
function createWhere({category,name,color,price,low,high,limit,id}){
    limit = setLimit(limit)

    const where = {}
    
    if(id)where.id = id
    if(category && category.length >0 )where.category = {[Op.in]:category}
    if(name)where.name = name
    if(color)where.color = color
    if(price)where.price=price
    if( low && high)where.price = {[Op.between]:[low,high]}
    if( low && !high)where.price = {[Op.lt]:low}
   

  
    return {where}
}
const isValidNumber = (number)=> {  
    if (typeof number === 'number' && !isNaN(number) && number > 0) return true; 
    
    return false
    
}
module.exports = {createWhere,setLimit,isValidNumber}