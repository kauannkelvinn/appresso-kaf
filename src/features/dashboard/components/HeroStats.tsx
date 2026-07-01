import { Card } from "@/components/ui/Card";

interface HeroStatsProps {
  events: { createdAt: Date }[];
}

export function HeroStats({ events }: HeroStatsProps) {
  const today = new Date().toDateString();
  const eventsToday = events.filter(e => e.createdAt.toDateString() === today).length;

  const totalEvents = events.length;
  const minutesSaved = totalEvents * 15;
  const hoursSaved = (minutesSaved / 60).toFixed(1);
  const [whole, decimal] = hoursSaved.split('.');

  return (
    <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4 items-start pt-4 w-full">
      <Card variant="red" className="w-full lg:flex-1 h-[160px]">
        <p className="text-[13px] font-black uppercase leading-tight">Eventos<br />Hoje</p>
        <div className="py-3">
          <p className="text-[40px] lg:text-[48px] font-bold leading-none">{eventsToday}</p>
          <p className="text-[13px] font-black opacity-40 leading-none">Meta diária: 5</p>
        </div>
      </Card>

      <Card className="w-full lg:flex-1 flex flex-col justify-between h-[160px]">
        <p className="text-[13px] font-black uppercase leading-tight">Time<br />Saved</p>
        <div className="py-3">
          <p className="text-[40px] lg:text-[48px] font-bold leading-none">
            {whole}.<span className="opacity-50">{decimal}h</span>
          </p>
          <p className="text-[13px] font-black opacity-40">Baseado no total de {totalEvents} logs</p>
        </div>
      </Card>
    </div>
  );
}