import { prisma } from "./src/Lib/prima"

afterAll(async()=>{
    await prisma.$disconnect()
})
afterEach(()=>{
   
  jest.clearAllMocks();
})