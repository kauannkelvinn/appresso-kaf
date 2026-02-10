'use server';

import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function parseUserIntent(userInput: string) {
  const result = await generateObject({
    // Usamos o modelo flash estável conforme a documentação
    model: google('gemini-2.5-flash'), 
    schema: z.object({
      type: z.enum(['FINANCE', 'TASK', 'NOTE', 'MEETING']),
      content: z.string().describe('Resumo da ação'),
      amount: z.number().nullable().describe('Valor monetário se houver'),
      category: z.string().nullable().describe('Categoria do gasto ou tarefa'),
      dueDate: z.string().nullable().describe('Data de vencimento ou agendamento')
    }),
    system: "És o cérebro do Appresso Kaf. Extrai os dados da mensagem de forma simplificada.",
    prompt: userInput,
  });

  return result.object;
}