import { prisma } from '@/lib/prisma';
import { parseUserIntent } from '@/services/ai-parses';
import { Prisma } from '@prisma/client';

export async function processKafCommand(userId: string, message: string) {
  const interpreted = await parseUserIntent(message);

  const newEvent = await prisma.event.create({
    data: {
      userId,
      type: interpreted.type,
      content: interpreted.content,
      metadata: (interpreted.metadata || {}) as Prisma.JsonObject,
      status: 'COMPLETED'
    }
  });

  return newEvent;
}