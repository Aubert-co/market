import { prisma } from "../../lib/prima"
import { products } from "./products"


export const oneUser = {name:'lucas',password:'1234456',email:'joses@gmail.com',id:1}
export const oneStore = {name:'stores',description:'store description',userId:1,id:1}
export const deleteStore = async():Promise<void>=>{
    await prisma.store.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    }) 
}

export const deleteUser = async():Promise<void>=>{
    await prisma.user.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
}

export const deleteProduct = async():Promise<void>=>{
    await prisma.product.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
} 

export const cleanAllDb = async():Promise<void>=>{
    await deleteProduct()
    await deleteStore()
    await deleteUser()
}

export const createOneUser = async():Promise<void>=>{
    await prisma.user.create({data:oneUser})
}

export const createUserStoreAndProducts = async():Promise<void>=>{
    await prisma.user.create( {data:oneUser} )
    await prisma.store.create({data:oneStore})
    await prisma.product.createMany({data:products})
}