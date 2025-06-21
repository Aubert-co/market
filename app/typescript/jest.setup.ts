import { prisma } from "./src/lib/prima"

afterAll(async()=>{
    await prisma.$disconnect()
})
afterEach(()=>{
   
  jest.clearAllMocks();
})