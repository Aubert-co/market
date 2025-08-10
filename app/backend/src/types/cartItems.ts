import { Prisma } from "@prisma/client"
export type  CartWithItems = Prisma.CartitemGetPayload<{
    include:{product:{
                select:{
                    stock:true,
                    price:true,
                    imageUrl:true,
                    name:true
                    }
                }
            }
}>

