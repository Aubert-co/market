import { Prisma, PrismaClient } from "@prisma/client";



export type UserReviewsAndComments = Prisma.UserGetPayload<{
    select:{
        reviews:{
            where:{
                orderId:number
            }
        },
        comments:{
            where:{
                orderId:number
            }
        }
    }
}>