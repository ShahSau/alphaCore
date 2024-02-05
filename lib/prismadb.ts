import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient()
// const prismadb = typeof window !== "undefined" ? {} as unknown as PrismaClient : new PrismaClient()
// const prismadb = globalThis.prisma 
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb;
