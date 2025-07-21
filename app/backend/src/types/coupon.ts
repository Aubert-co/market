import { Prisma } from "@prisma/client";

export type Coupon = Prisma.CouponGetPayload<{}>

export type CouponUsage = Prisma.CouponUsageGetPayload<{}>