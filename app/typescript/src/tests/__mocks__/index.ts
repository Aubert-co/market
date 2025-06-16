import { prisma } from "../../lib/prima"


export const oneUser = {name:'lucas',password:'1234456',email:'joses@gmail.com'}
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