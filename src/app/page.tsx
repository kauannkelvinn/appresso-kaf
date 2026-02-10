'use client';

import { useState } from 'react';
import { processKafCommand } from './actions';
import type { Event } from '@prisma/client';

export default function LandingPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Event | null>(null);

  const handleAction = async () => {
    setLoading(true);
    try {
      // Usando um ID temporário para você testar agora
      const data = await processKafCommand('dev_user_kaf', input);
      setResult(data);
      setInput('');
    } catch (e) {
      console.error("Erro na automação:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-6 font-sans">
      {/* Header com Logo Tim Burton Style */}
      <header className="mt-12 mb-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-black border-2 border-[#C0C0C0] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(192,192,192,0.4)] mb-4">
          <span className="text-3xl">💀</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic bg-linear-to-b from-[#C0C0C0] to-[#4A4A4A] bg-clip-text text-fill-color-transparent">
          Appresso Kaf
        </h1>
      </header>

      {/* Input de Automação */}
      <div className="w-full max-w-md space-y-6">
        <div className="group relative">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="O que vamos simplificar hoje?"
            className="w-full h-32 bg-[#111] border border-gray-800 rounded-2xl p-4 text-sm focus:border-[#7B0A0A] transition-all outline-none resize-none"
          />
        </div>

        <button 
          onClick={handleAction}
          disabled={loading}
          className="w-full py-4 bg-[#7B0A0A] hover:bg-[#9B0A0A] text-white font-bold rounded-xl shadow-[0_5px_0_#4A0000] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
        >
          {loading ? 'PROCESSANDO...' : 'EXECUTAR COMANDO'}
        </button>

        {/* Feedback da IA em tempo real */}
        {result && (
          <div className="p-4 bg-[#111] border border-[#C0C0C0]/20 rounded-xl animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-[#C0C0C0] text-[10px] uppercase font-bold mb-2 tracking-widest">Resultado da Automação</h3>
            <pre className="text-xs text-green-500 overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <footer className="mt-auto py-8 text-[10px] text-gray-600 tracking-widest uppercase">
        Escalabilidade & Simplicidade • 2026
      </footer>
    </div>
  );
}