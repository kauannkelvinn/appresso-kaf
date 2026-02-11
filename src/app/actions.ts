'use server'

import { prisma } from '@/lib/prisma';
import { parseUserIntent } from '@/services/ai-parses';
import { Prisma } from '@prisma/client';

export async function processKafCommand(userId: string, message: string) {
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: `${userId}@appressokaf.com`,
      name: 'Dev User',
      plan: 'STANDARD',
    }
  });

  const interpreted = await parseUserIntent(message);

  const newEvent = await prisma.event.create({
    data: {
      userId,
      type: interpreted.type,
      content: interpreted.content,
      metadata: {
        amount: interpreted.amount,
        category: interpreted.category,
        dueDate: interpreted.dueDate,
      } as Prisma.JsonObject,
      status: 'COMPLETED'
    }
  });

  return newEvent;
}