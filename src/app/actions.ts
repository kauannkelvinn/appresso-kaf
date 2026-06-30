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

export async function toggleHabitAction(habitName: string, userIdentifier: string, specificDay?: number) {
  // 1. Pega o dia clicado (ou o dia de hoje se vier do WhatsApp)
  const dayToToggle = specificDay !== undefined ? specificDay : new Date().getDay();

  // 2. Tenta achar o hábito no banco
  const habit = await prisma.habit.findFirst({
    where: {
      name: { contains: habitName, mode: 'insensitive' },
      userIdentifier
    }
  });

  // 3. SE O HÁBITO NÃO EXISTE: Cria ele do zero já com o dia marcado!
  if (!habit) {
    await prisma.habit.create({
      data: {
        name: habitName,
        userIdentifier: userIdentifier,
        completedDays: [dayToToggle]
      }
    });
    
    // Limpa o cache pra forçar a tela a buscar o dado novo
    revalidatePath('/habits');
    return;
  }

  // 4. SE O HÁBITO JÁ EXISTE: Marca ou desmarca o dia
  const isAlreadyDone = habit.completedDays.includes(dayToToggle);
  const newDays = isAlreadyDone
    ? habit.completedDays.filter((d: number) => d !== dayToToggle)
    : [...habit.completedDays, dayToToggle];

  await prisma.habit.update({
    where: { id: habit.id },
    data: { completedDays: newDays }
  });

  // 5. Limpa o cache pra forçar a tela a buscar o dado novo
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