import { NextResponse } from 'next/server';
import { processKafCommand, toggleHabitAction, sendWhatsAppMessage } from '@/app/actions';

// 1. Força a rota a ser dinâmica para evitar erro de Prisma no build
export const dynamic = 'force-dynamic';

// 2. Importe o prisma como default (ajuste conforme seu lib/prisma.ts)
import prisma from '@/lib/prisma';

interface WhatsAppContact {
  profile: { name: string };
  wa_id: string;
}

// VALIDAÇÃO DO WEBHOOK (Obrigatório para o Meta)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response('Forbidden', { status: 403 });
}

// RECEBIMENTO DE MENSAGENS
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Log para depuração no painel da Vercel
    console.log("WEBHOOK RECEBIDO:", JSON.stringify(body));

    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const contact: WhatsAppContact | undefined = body.entry?.[0]?.changes?.[0]?.value?.contacts?.[0];

    if (message?.text?.body) {
      const text = message.text.body.toLowerCase();
      const userName = contact?.profile?.name || "Kaf User";
      let feedbackMessage = "";

      // Lógica de Hábitos Rápidos
      if (text.includes('beber') || text.includes('água') || text.includes('treino')) {
        const habitName = text.includes('água') ? 'Beber 4L Água' : 'Treinar Musculação';
        
        // Usando o Server Action que você já tem
        await toggleHabitAction(habitName, 'dev_user_kaf');
        feedbackMessage = `Boa, ${userName}! ✅ Hábito "${habitName}" registrado. Foco total! 🚀`;
      } else {
        // Processamento via IA
        const result = await processKafCommand('dev_user_kaf', message.text.body);
        feedbackMessage = `Show, ${userName}! Comando "${result.type}" processado com IA.`;
      }

      // Envio de volta para o WhatsApp
      if (feedbackMessage) {
        const cleanNumber = message.from.replace(/\D/g, '');
        await sendWhatsAppMessage(cleanNumber, feedbackMessage);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook Error:', error);
    // Retornamos 200 mesmo no erro para o WhatsApp não ficar reenviando a mesma mensagem em loop
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 });
  }
}