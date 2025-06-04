import  {Storage}  from '@google-cloud/storage';
import { Buffer } from 'buffer'; 
import { v4 as uuidv4 } from 'uuid'; 
import * as path from 'path'
import stream from 'stream'



const storage = new Storage({})
const BUCKET_NAME = process.env.GCS_BUCKET_NAME ;

if (!BUCKET_NAME || BUCKET_NAME === 'your-default-gcs-bucket-name') {
   
    throw new Error("GCS_BUCKET_ERROR: GCS_BUCKET_NAME environment variable is missing.");
}


export const uploadFileToGCS = async (
    fileBuffer: Buffer,
    originalFileName: string,
    mimeType: string
): Promise<string> => {
 
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer) || fileBuffer.length === 0) {
        throw new Error("File buffer is invalid or empty.");
    }
    if (!originalFileName || typeof originalFileName !== 'string' || originalFileName.trim() === '') {
        throw new Error("Original file name is invalid.");
    }
    if (!mimeType || typeof mimeType !== 'string' || mimeType.trim() === '') {
        throw new Error("MIME type is invalid.");
    }

    const bucket = storage.bucket(BUCKET_NAME);

    const fileExtension = path.extname(originalFileName); 
    const baseName = path.basename(originalFileName, fileExtension); 
    const uniqueFileName = `${baseName.substring(0, 50)}-${uuidv4()}${fileExtension}`; 
    const dataStream = new stream.PassThrough()

    const gcFile = storage.bucket(BUCKET_NAME).file(uniqueFileName)
    
    dataStream.push('content-to-upload')
    dataStream.push(null)

    await new Promise((resolve,reject)=>{
        dataStream.pipe(gcFile.createWriteStream({
            resumable  : false,
            validation : false,
            metadata   : {'Cache-Control': 'public, max-age=31536000'}
        }))
        .on('error', (error : Error) => { 
            reject(error) 
        })
        .on('finish', () => { 
            resolve(true)
        })
    })
   
    return "";
    
};