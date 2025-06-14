import fs from "fs";
import path from 'path'

const assetsDir = path.resolve(__dirname);
const padding = Buffer.alloc(6 * 1024); 
    const files = [
        {
        name: 'large-image.jpg',
        buffer: Buffer.concat([
        Buffer.from([0xFF, 0xD8, 0xFF]),              
        Buffer.alloc(6 * 1024 * 1024)                
        ])
    },
    {
      name: 'image.pdf',
      buffer: Buffer.concat([
        Buffer.from('%PDF-1.4\n'),
        padding
      ])
    },
    {
      name: 'image.jpg',
      buffer: Buffer.concat([
        Buffer.from([0xFF, 0xD8, 0xFF]), // JPEG
        padding
      ])
    },
    {
      name: 'image.png',
      buffer: Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]), // PNG
        padding
      ])
    },
    {
      name: 'image-gif87a.gif',
      buffer: Buffer.concat([
        Buffer.from('GIF87a', 'ascii'),
        padding
      ])
    },
    {
      name: 'image-gif89a.gif',
      buffer: Buffer.concat([
        Buffer.from('GIF89a', 'ascii'),
        padding
      ])
    },
    {
      name: 'image.webp',
      buffer: Buffer.concat([
        Buffer.from('RIFF'),
        Buffer.alloc(4),
        Buffer.from('WEBP'),
        padding
      ])
    },
    {
      name: 'image.mp4',
      buffer: Buffer.concat([
        Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D]),
        padding
      ])
    },
    {
      name: 'image.bmp',
      buffer: Buffer.concat([
        Buffer.from('BM'),
        padding
      ])
    },
    {
      name: 'image.tiff',
      buffer: Buffer.concat([
        Buffer.from([0x4D, 0x4D, 0x00, 0x2A]),
        padding
      ])
    }
  ];

const generateImages = ()=> {
 
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
  
  files.forEach(({ name, buffer }) => {
    const filePath = path.join(assetsDir, name);
    fs.writeFileSync(filePath, buffer);
  });
}
generateImages()
export const deleteImages = () => {
  files.map(({name}) => {
    const filePath = path.join(assetsDir, name);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};