'use server'

import { revalidatePath } from 'next/cache';
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

export async function toggleHabitAction(habitName: string, userId: string, specificDay?: number) {
  const dayToToggle = specificDay !== undefined ? specificDay : new Date().getDay();
  
  const habit = await prisma.habit.findFirst({
    where: {
      name: { contains: habitName, mode: 'insensitive' },
      userId
    }
  });

  if (!habit) {
    await prisma.habit.create({
      data: {
        name: habitName,
        userId: userId,
        completedDays: [dayToToggle]
      }
    });
    
    revalidatePath('/habits');
    return;
  }

  const isAlreadyDone = habit.completedDays.includes(dayToToggle);
  const newDays = isAlreadyDone
  ? habit.completedDays.filter((d: number) => d !== dayToToggle)
    : [...habit.completedDays, dayToToggle];
    
    await prisma.habit.update({
      where: { id: habit.id },
      data: { completedDays: newDays }
    });
    
    revalidatePath('/habits');
  }
  
  export async function createHabitAction(habitName: string, userId: string) {
    await prisma.habit.create({
      data: {
        name: habitName,
        userId,
        completedDays: []
      }
    });
    
    revalidatePath('/habits');
  }
  
  export async function sendWhatsAppMessage(to: string, text: string) {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    
  console.log("Tentando enviar para ID:", phoneNumberId);

  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: to,
      type: "text",
      text: { body: text }
    }),
  });

  const data = await response.json();
  console.log("Resposta da Meta:", JSON.stringify(data));
  return data;
}