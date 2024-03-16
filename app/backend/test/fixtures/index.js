const path = require('path')
const body ={id:2000,
    resume:"lorem",
    title:"get_title",
    content:"get_content",
    imgPath:"get_testePath",
    imgName:"get_testeimg",
    category:"games"
}
const otherBody ={
    id:2001,
    content:'animalstest',
    category:'animals',
    title:'titleanimal',
    imgName:'animalsgame',
    imgPath:'path/path/animals',
    resume:'lorem'
}
const moreData = {
    id:2002,
    content:'animalstest',
    category:'sports',
    title:'titlesports',
    imgName:'animalsgame',
    imgPath:'path/path/animals',
    resume:'lorem'
}

module.exports = {
    pathImg:(imgPath)=>path.join(__dirname,'../fixtures',imgPath),
    body,moreData,otherBody

}