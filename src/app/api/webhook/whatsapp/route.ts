import { NextResponse } from 'next/server';
import { processKafCommand, toggleHabitAction } from '@/app/actions';

interface WhatsAppMessage {
  from: string;
  text: { body: string };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: WhatsAppMessage | undefined = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message?.text?.body) {
      const text = message.text.body.toLowerCase();
      
      if (text.includes('beber') || text.includes('água') || text.includes('treino')) {
        const habitName = text.includes('água') ? 'Beber 4L Água' : 'Treinar Musculação';
        await toggleHabitAction(habitName, 'dev_user_kaf');
      }

      await processKafCommand('dev_user_kaf', message.text.body);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}