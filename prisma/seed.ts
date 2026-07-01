import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const devUserId = 'dev_user_kaf';

  await prisma.user.upsert({
    where: { id: devUserId },
    update: {},
    create: {
      id: devUserId,
      email: 'dev@appressokaf.com',
      name: 'Kauan (Dev)',
    }
  });

  await prisma.habit.createMany({
    data: [
      { name: 'Treinar Musculação', userId: devUserId, completedDays: [] },
      { name: 'Beber 4L Água', userId: devUserId, completedDays: [] },
      { name: 'Codar Projetos', userId: devUserId, completedDays: [] },
    ],
  });
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })