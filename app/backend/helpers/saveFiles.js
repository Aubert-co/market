const  fs = require('fs').promises;

async function existImg(path){
    if(!path)return false

    try {
        await fs.access(path);
        return true; 
    }catch (error) {
        if (error.code === 'ENOENT') return false; 
         
        throw error; 
    }
}
const createPathImg = (files)=>{
    if(!files.name || !files.data)return {imgName:undefined,imgPath:undefined}

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const [imgName,extension] = files.name.split('.')
    const imgPath = './public/'+uniqueSuffix+'.'+extension
    return {imgName,imgPath,extension}
}
async function savesImg(files,imgPath){
    if(!imgPath)return {imgName:undefined,imgPath:undefined}
    if(!files.name || !files.data)return {imgName:undefined,imgPath:undefined}

    const buffer = Buffer.from(files.data)
    
    await fs.writeFile(imgPath, buffer).catch(err => { throw err; });
}

module.exports = {existImg ,savesImg ,createPathImg}