import { Card } from "@/components/ui/Card";

interface HabitCardProps {
  title: string;
  subtitle: string;
  streak: number;
  completedDays: boolean[]; // Array de 7 posições para os quadradinhos
  variant?: 'default' | 'red';
}

export function HabitCard({ title, subtitle, streak, completedDays, variant = 'default' }: HabitCardProps) {
  return (
    <Card variant={variant} className="w-[280px] h-[160px] flex flex-col justify-between p-6">
      <div className="flex flex-col">
        <p className="text-[12px] font-black uppercase leading-tight opacity-70">{title}</p>
        <p className="text-[15px] font-black uppercase leading-tight">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Quadradinhos de progresso */}
        <div className="flex gap-1.5">
          {completedDays.map((isDone, i) => (
            <div 
              key={i} 
              className={`w-6 h-6 border border-black/20 rounded-[4px] ${isDone ? 'bg-black' : 'bg-transparent'}`} 
            />
          ))}
        </div>

        {/* Streak com ícone de chama */}
        <div className="flex items-center justify-end gap-1 text-[11px] font-black uppercase">
          <span>🔥 {streak} DIAS</span>
        </div>
      </div>
    </Card>
  );
}