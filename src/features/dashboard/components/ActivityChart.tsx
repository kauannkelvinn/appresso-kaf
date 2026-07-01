import { Card } from "@/components/ui/Card";

interface ActivityChartProps {
  events: { createdAt: Date }[];
}

export function ActivityChart({ events }: ActivityChartProps) {
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      dateObj: d,
      dateStr: d.toISOString().split('T')[0],
      dayName: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"][d.getDay()]
    };
  });

  const dailyCounts = last7Days.map(dayInfo => 
    events.filter(e => e.createdAt.toISOString().split('T')[0] === dayInfo.dateStr).length
  );

  const maxEvents = Math.max(...dailyCounts, 1);
  const graphHeight = 150;
  const chartWidth = 700;

  const svgPoints = dailyCounts.map((count, index) => {
    const x = Math.round(index * (chartWidth / 6));
    const y = Math.round(230 - ((count / maxEvents) * graphHeight));
    return `${x},${y}`;
  }).join(' ');

  const eventsToday = dailyCounts[dailyCounts.length - 1];

  return (
    <Card className="h-[380px] lg:h-[400px] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-8 w-full p-2">
        <p className="text-[15px] font-black uppercase tracking-tight leading-tight shrink-0">
          Activity<br />Evolution
        </p>
        <div className="flex-1 flex justify-center">
          <div className="flex gap-4 lg:gap-16 text-[12px] lg:text-[15px] font-black overflow-x-auto no-scrollbar">
            {last7Days.map((day) => (
              <span key={day.dateStr} className="text-brand-gray/40">{day.dayName}</span>
            ))}
          </div>
        </div>
        <div className="shrink-0">
          <img src="/calendar.png" alt="Calendar" className="w-5 h-5 lg:w-6 lg:h-6 object-contain" />
        </div>
      </div>

      <div className="flex-1 w-full relative min-h-[150px]">
        <svg viewBox="0 0 700 280" className="w-full h-full" preserveAspectRatio="none">
          <line x1="0" y1="90" x2="700" y2="90" stroke="black" strokeOpacity="0.05" />
          <line x1="0" y1="180" x2="700" y2="180" stroke="black" strokeOpacity="0.05" />
          
          <polyline
            fill="none"
            className="stroke-brand-black stroke-[4]"
            points={svgPoints}
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute right-4 bottom-4 text-right">
          <p className="text-[10px] font-bold text-brand-gray">HOJE:</p>
          <p className="text-sm font-black uppercase">{eventsToday} Tasks</p>
        </div>
      </div>
    </Card>
  );
}