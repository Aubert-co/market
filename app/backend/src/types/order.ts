import { Prisma } from "@prisma/client";

export type Order = Prisma.OrderGetPayload<{}>

export type OrderItem = Prisma.OrderItemGetPayload<{}>