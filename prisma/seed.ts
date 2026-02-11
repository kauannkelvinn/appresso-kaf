import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const userIdentifier = 'dev_user_kaf';
  
  await prisma.habit.createMany({
    data: [
      { name: 'Treinar Musculação', userIdentifier, completedDays: [] },
      { name: 'Beber 4L Água', userIdentifier, completedDays: [] },
      { name: 'Codar Projetos', userIdentifier, completedDays: [] },
    ],
  })
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })