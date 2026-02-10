import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function parseUserIntent(userInput: string) {
  const result = await generateObject({
    model: openai('gpt-4o-mini'),
    system: `Você é o cérebro do Appresso Kaf. Sua missão é simplificar a vida do usuário.
             Analise a mensagem e extraia a intenção, o conteúdo e metadados relevantes.`,
    schema: z.object({
      type: z.enum(['FINANCE', 'TASK', 'NOTE', 'MEETING']),
      content: z.string().describe('O resumo da ação em linguagem natural'),
      metadata: z.object({
        amount: z.number().optional(),
        category: z.string().optional(),
        dueDate: z.string().optional(),
      }).optional(),
    }),
    prompt: userInput,
  });

  return result.object;
}