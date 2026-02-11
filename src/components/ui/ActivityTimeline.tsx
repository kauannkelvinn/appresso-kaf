'use client';

import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TimelineEvent {
  createdAt: Date | string;
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

export function ActivityTimeline({ events }: ActivityTimelineProps) {
  const data = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    const count = events.filter(e => {
      const eventDate = typeof e.createdAt === 'string' 
        ? new Date(e.createdAt) 
        : e.createdAt;
      return format(eventDate, 'yyyy-MM-dd') === dateStr;
    }).length;

    return {
      name: format(date, 'EEE', { locale: ptBR }),
      uv: count,
    };
  });

  return (
    <div className="w-full h-30 bg-[#0D0D0D] border border-white/5 p-2 mt-1">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7B0A0A" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#7B0A0A" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 8, fill: '#4A4A4A', fontWeight: 'bold' }}
            interval={0}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#000', 
              border: '1px solid #1a1a1a', 
              fontSize: '10px',
              borderRadius: '8px'
            }}
            itemStyle={{ color: '#7B0A0A' }}
            cursor={{ stroke: '#1a1a1a', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="uv" 
            stroke="#7B0A0A" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorUv)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}