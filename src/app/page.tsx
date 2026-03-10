'use client';

import { useState, useEffect, useCallback } from 'react';
import { processKafCommand, getEvents, getHabits } from './actions';
import type { Event } from '@prisma/client';
import { HistoryList, type KafEvent } from '@/components/ui/HistoryList';
import { ActivityTimeline } from '@/components/ui/ActivityTimeline';
import { HabitGrid, type Habit } from '@/components/ui/HabitGrid';

export default function LandingPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Event | null>(null);
  const [history, setHistory] = useState<KafEvent[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const [eventsData, habitsData] = await Promise.all([
        getEvents('dev_user_kaf'),
        getHabits('dev_user_kaf')
      ]);
      setHistory(eventsData as unknown as KafEvent[]);
      setHabits(habitsData as unknown as Habit[]);
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAction = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await processKafCommand('dev_user_kaf', input);
      setResult(data);
      setInput('');
      await fetchData();
    } catch (e) {
      console.error("Erro na automação:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAction();
    }
  };

  return (
    <main className="flex flex-col max-w-350 mx-auto px-4">
      <header className="flex justify-between items-center py-4 border-b border-white/5">
        <h1 className="text-xl font-black tracking-tighter uppercase chrome-effect">
          Appresso Kaf
        </h1>
        <h1 className='text-8xl'>Master <br />You <br />Skills</h1>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">User: dev_user_kaf</span>
          <div className="w-2 h-2 rounded-full bg-kaf-success animate-pulse" />
        </div>
      </header>

      <section className="grid grid-cols-3 gap-1 py-4">
        {[
          { label: 'Tasks Created', value: history.length, color: 'text-kaf-primary' },
          { label: 'Time Saved', value: `${(history.length * 0.2).toFixed(1)}h`, color: 'text-kaf-success' },
          { label: 'Habit Score', value: `${Math.round((habits.filter(h => h.completedDays.length > 0).length / (habits.length || 1)) * 100)}%`, color: 'text-white' }
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0D0D0D] p-4 border border-white/5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-1 font-bold">{stat.label}</p>
            <p className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="py-2">
        <div className="w-full h-30 min-h-30 flex justify-between items-center mb-2">
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
              onKeyDown={handleKeyDown}
              placeholder="O que vamos simplificar hoje?"
              className="w-full h-48 bg-[#0D0D0D] border border-white/10 p-4 text-sm font-mono focus:border-kaf-primary transition-all outline-none resize-none placeholder:text-gray-800"
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
              <p className="text-[9px] uppercase text-kaf-primary mb-1 tracking-widest font-mono font-bold">Última Ação</p>
              <p className="text-xs text-gray-300 italic">{`"${result.content}" processado com sucesso.`}</p>
            </div>
          )}
        </div>

        <div className="md:col-span-7 border-l border-white/5 pl-0 md:pl-6 space-y-6">
          {habits.length > 0 && <HabitGrid habits={habits} />}
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