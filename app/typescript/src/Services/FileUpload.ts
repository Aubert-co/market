import  {Storage}  from '@google-cloud/storage';
import { Buffer } from 'buffer'; 
import { ErrorMessage } from '../Helpers/ErrorMessage';

const PRIVATE_KEY = process.env.PRIVATE_KEY
if(!PRIVATE_KEY)throw new Error();
 
const KEY_STORAGE = JSON.parse( PRIVATE_KEY )
const storage = new Storage({
    credentials:KEY_STORAGE,
    projectId:KEY_STORAGE.project_id
})
const BUCKET_NAME = process.env.BUCKET_NAME ;

if (!BUCKET_NAME ) {
   
    throw new Error();
} 
const bucket = storage.bucket(BUCKET_NAME)


export const uploadFileToGCS = async (
    fileBuffer: Buffer,
    path: string,
    mimeType: string
): Promise<string> => {
 
    const blob = bucket.file( path );
    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType:mimeType,
        metadata: {
        cacheControl: 'public, max-age=31536000',         },
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', err => {
        reject(err);
        });

        blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
        });

        blobStream.end(fileBuffer);
    });
    
};
