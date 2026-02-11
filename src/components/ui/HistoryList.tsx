'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface KafEvent {
  id: string;
  userId: string;
  type: string; 
  content: string;
  status: string;
  createdAt: Date | string;
  metadata: Record<string, unknown> | null; 
}

interface HistoryListProps {
  events: KafEvent[];
}

export function HistoryList({ events }: HistoryListProps) {
  if (events.length === 0) return null;

  return (
    <div className="w-full mt-10 space-y-4">
      <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-4">
        Histórico Recente
      </h2>
      {events.map((event) => (
        <div key={event.id} className="bg-[#0a0a0a] border border-gray-900 rounded-xl p-4 flex justify-between items-center group hover:border-kaf-red/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black border border-gray-800 flex items-center justify-center text-sm">
              {event.type === 'FINANCE' ? 'R$' : '⚡'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">{event.content}</p>
              <p className="text-[9px] text-gray-600 uppercase tracking-widest">
                {format(new Date(event.createdAt), "dd MMM • HH:mm", { locale: ptBR })}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-kaf-red group-hover:w-full transition-all duration-500"></div>
        </div>
      ))}
    </div>
  );
}