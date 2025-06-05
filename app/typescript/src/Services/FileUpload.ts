import  {Storage}  from '@google-cloud/storage';
import { Buffer } from 'buffer'; 
import { v4 as uuidv4 } from 'uuid'; 
import * as path from 'path'
import stream from 'stream'
import { ErrorMessage } from '../Helpers/ErrorMessage';

const PRIVATE_KEY = process.env.PRIVATE_KEY
if(!PRIVATE_KEY)throw new ErrorMessage("NOT PRIVATE_KEY FOUND",501)

const KEY_STORAGE = JSON.parse( PRIVATE_KEY )
const storage = new Storage({
    credentials:KEY_STORAGE,
    projectId:KEY_STORAGE.project_id
})
const BUCKET_NAME = process.env.BUCKET_NAME ;

if (!BUCKET_NAME || BUCKET_NAME === 'your-default-gcs-bucket-name') {
   
    throw new Error("GCS_BUCKET_ERROR: GCS_BUCKET_NAME environment variable is missing.");
} 
const bucket = storage.bucket(BUCKET_NAME)

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

    const blob = bucket.file(Date.now() + '_' + originalFileName);
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