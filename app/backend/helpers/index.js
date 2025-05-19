const {Op} = require('sequelize')

const setLimit = (limit)=>{
    if(!limit)return limit = 5
    limit = isNaN(limit) ? 5 : Math.min(Number(limit), 25);
   return limit = limit ===0 ? 5 :limit
}
function generateWhereClause({category,name,color,low,high,limit,id}){
  
    const where = {}
    
    if(id)where.id = id
    if(category && category.length >0 )where.category = category
    if(name)where.name = {[Op.like]:name}
    if(color)where.color = color
    if( low && high)where.price = {[Op.between]:[low,high]}
    if( low && !high)where.price = {[Op.lt]:low}
    if(!low && high)where.price = {[Op.between]:[0,high]}
   
   
  
    return {where,limit}
}

const sanitizeString = (str)=>{   
    if(str)return str.replace(/[^a-zA-Z\s]/g, '');
}
const isValidNumber = (number)=> {  
    number = Number(number)
    if (typeof number === 'number' && !isNaN(number) && number > 0 && number !== Infinity && number%1===0) return true; 
    
    return false
}
const clampToRange = (value)=>{
    value = value > 5 ? 5 : value
    value = value <1 ? 1:value
    return value
}
function updateWhere(params){

    const keys = Object.keys(params)
    const newObjet = {}
    keys.map((key)=>{
        const value= params[key] 
        if(value)return newObjet[key] = value
    }).filter((val)=>val!==undefined)
    
    return newObjet
}
const isStringLengthAtLeast4 = (str)=>{
   return typeof str === 'string' && str.length >= 4;
}


module.exports = {isStringLengthAtLeast4,generateWhereClause,setLimit,isValidNumber,sanitizeString,updateWhere,clampToRange }








