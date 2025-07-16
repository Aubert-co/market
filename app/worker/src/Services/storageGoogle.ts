import  {Storage}  from '@google-cloud/storage';

const PRIVATE_KEY = process.env.PRIVATE_KEY
if(!PRIVATE_KEY)throw new Error("no private key");
 
const KEY_STORAGE = JSON.parse( PRIVATE_KEY )
const storage = new Storage({
    credentials:KEY_STORAGE,
    projectId:KEY_STORAGE.project_id
})
const BUCKET_NAME = process.env.BUCKET_NAME ;

if (!BUCKET_NAME ) {
    throw new Error("no bucket name");
} 
const bucket = storage.bucket(BUCKET_NAME)

export const deleteImgFromBucket = async(imageName:string)=>{
  try{
    await storage.bucket(BUCKET_NAME).file(imageName).delete()
  }catch(err:any){
    throw err
  }
}