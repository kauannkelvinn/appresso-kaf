import { Card } from "@/components/ui/Card";

export function ActivityChart() {
  return (
    <Card className="h-[380px] lg:h-[400px] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-8 w-full p-2">
        <p className="text-[15px] font-black uppercase tracking-tight leading-tight shrink-0">
          Activity<br />Evolution
        </p>
        <div className="flex-1 flex justify-center">
          <div className="flex gap-4 lg:gap-16 text-[12px] lg:text-[15px] font-black overflow-x-auto no-scrollbar">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map((dia) => (
              <span key={dia} className="text-brand-gray/40">{dia}</span>
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
            points="0,230 116,190 232,240 348,130 464,170 580,80 700,100"
            strokeLinecap="square"
          />
        </svg>
        <div className="absolute right-4 bottom-4 text-right">
          <p className="text-[10px] font-bold text-brand-gray">HOJE:</p>
          <p className="text-sm font-black uppercase">12 Tasks</p>
        </div>
      </div>
    </Card>
  );
}