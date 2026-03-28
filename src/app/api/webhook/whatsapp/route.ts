import { NextResponse } from 'next/server';
import { processKafCommand, toggleHabitAction, sendWhatsAppMessage } from '@/app/actions';

export const dynamic = 'force-dynamic';
interface WhatsAppContact {
  profile: { name: string };
  wa_id: string;
}

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const contact: WhatsAppContact | undefined = body.entry?.[0]?.changes?.[0]?.value?.contacts?.[0];

    if (message?.text?.body) {
      console.log("MENSAGEM RECEBIDA:", message.text.body); // LOG 1

      const text = message.text.body.toLowerCase();
      const userName = contact?.profile?.name || "Kaf User";
      let feedbackMessage = "";

      if (text.includes('beber') || text.includes('água') || text.includes('treino')) {
        const habitName = text.includes('água') ? 'Beber 4L Água' : 'Treinar Musculação';
        console.log(`Marcando hábito: ${habitName}`); // LOG 2

        await toggleHabitAction(habitName, 'dev_user_kaf');
        feedbackMessage = `Boa, ${userName}! ✅ Hábito "${habitName}" registrado. Foco total! 🚀`;
      } else {
        const result = await processKafCommand('dev_user_kaf', message.text.body);
        feedbackMessage = `Show, ${userName}! Comando "${result.type}" processado.`;
      }

      console.log("FEEDBACK PRONTO:", feedbackMessage); // LOG 3

      if (feedbackMessage) {
        const cleanNumber = message.from.replace(/\D/g, '');
        console.log("ENVIANDO PARA:", cleanNumber); // LOG 4
        const waResponse = await sendWhatsAppMessage(cleanNumber, feedbackMessage);
        console.log("RESPOSTA DA API META:", JSON.stringify(waResponse)); // LOG 5
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}