import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
   
}

// call main and handle error using catch and finally

main().catch(e => {
    console.error(e.message)
}).finally(async () => {
    await prisma.$disconnect();
})