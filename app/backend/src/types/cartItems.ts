import { Prisma } from "@prisma/client"
export type  CartWithItems = Prisma.CartitemGetPayload<{
    include:{
        product:true
    }
}>

