// src/app/api/webhook/whatsapp/route.ts
import { NextResponse } from 'next/server';
import { processKafCommand } from '@/app/actions';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message?.text?.body) {
      await processKafCommand('dev_user_kaf', message.text.body);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}