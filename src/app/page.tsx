'use client';

import { useState, useEffect } from 'react';
import { processKafCommand, getEvents } from './actions';
import type { Event } from '@prisma/client';
import { HistoryList, type KafEvent } from '@/components/ui/HistoryList';
import { ActivityTimeline } from '@/components/ui/ActivityTimeline';

export default function LandingPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Event | null>(null);
  const [history, setHistory] = useState<KafEvent[]>([]);

  const fetchHistory = async () => {
    try {
      const data = await getEvents('dev_user_kaf');
      setHistory(data as unknown as KafEvent[]);
    } catch (e) { console.error("Erro ao carregar histórico:", e); }
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleAction = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await processKafCommand('dev_user_kaf', input);
      setResult(data);
      setInput('');
      await fetchHistory();
    } catch (e) { console.error("Erro na automação:", e); }
    finally { setLoading(false); }
  };

  return (
    <main className="flex flex-col max-w-350 mx-auto px-4">
      <header className="flex justify-between items-center py-4 border-b border-white/5">
        <h1 className="text-xl font-black tracking-tighter uppercase chrome-effect">
          Appresso Kaf
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">User: dev_user_kaf</span>
          <div className="w-2 h-2 rounded-full bg-kaf-success animate-pulse" />
        </div>
      </header>

      {/* 2. HERO STATS - Métrica Dença (Seção 6) */}
      <section className="grid grid-cols-3 gap-1 py-4">
        {[
          { label: 'Tasks Created', value: history.length, color: 'text-kaf-primary' },
          { label: 'Time Saved', value: '4.2h', color: 'text-kaf-success' },
          { label: 'Efficiency', value: '94%', color: 'text-white' }
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0D0D0D] p-4 border border-white/5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="py-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold">Activity Evolution</h2>
          <span className="text-[9px] font-mono text-kaf-success">Last 7 Days</span>
        </div>
        <ActivityTimeline events={history} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6">
        <div className="md:col-span-5 space-y-4">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite seu comando..."
              className="w-full h-48 bg-[#0D0D0D] border border-white/10 rounded-none p-4 text-sm font-mono focus:border-kaf-primary transition-all outline-none resize-none placeholder:text-gray-800"
            />
            <div className="absolute bottom-4 right-4 text-[9px] text-gray-700 font-mono uppercase tracking-widest">
              Gemini 2.5 Flash Ready
            </div>
          </div>

          <button
            onClick={handleAction}
            disabled={loading}
            className="w-full py-4 bg-kaf-red hover:bg-[#9B0A0A] text-white font-black text-xs uppercase tracking-[0.4em] transition-all disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Executar Comando'}
          </button>

          {result && (
            <div className="p-4 bg-kaf-primary/5 border-l-2 border-kaf-primary animate-in fade-in slide-in-from-left-4">
              <p className="text-[9px] uppercase font-bold text-kaf-primary mb-1 tracking-widest font-mono">Última Ação</p>
              <p className="text-xs text-gray-300 italic">{`"${result.content}" processado.`}</p>
            </div>
          )}
        </div>

        <div className="md:col-span-7 border-l border-white/5 pl-0 md:pl-6">
          <HistoryList events={history} />
        </div>
      </section>

      <footer className="py-6 mt-auto border-t border-white/5 flex justify-between items-center text-[9px] text-gray-700 tracking-[0.5em] uppercase font-mono">
        <span>© 2026 Appresso Kaf</span>
        <span>Escalabilidade & Simplicidade</span>
      </footer>
    </main>
  );
}