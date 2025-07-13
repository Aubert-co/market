import {deleteImages,generateImages} from './src/tests/assets/generate'
import {prisma} from './src/lib/prima'
export default async function (){
    await deleteImages()
    await prisma.$disconnect()
    
    console.log('apos tudo')
} 