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


export async function getEvents(userId: string) {
  'use server';
  try {
    return await prisma.event.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    return [];
  }
}
export async function getHabits(userIdentifier: string) {
  try {
    return await prisma.habit.findMany({
      where: { userIdentifier },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("Erro ao buscar hábitos:", error);
    return [];
  }
}

export async function toggleHabitAction(habitName: string, userIdentifier: string) {
  const habit = await prisma.habit.findFirst({
    where: { 
      name: { contains: habitName, mode: 'insensitive' },
      userIdentifier 
    }
  });

  if (!habit) return null;

  const today = new Date().getDay();
  const isAlreadyDone = habit.completedDays.includes(today);

  const newDays = isAlreadyDone 
    ? habit.completedDays.filter((d: number) => d !== today)
    : [...habit.completedDays, today];

  return await prisma.habit.update({
    where: { id: habit.id },
    data: { completedDays: newDays }
  });
}