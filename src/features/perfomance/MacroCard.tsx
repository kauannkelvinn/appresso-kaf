import { Card } from "@/components/ui/Card";

interface MacroCardProps {
  label: string;
  value: string;
  unit: string;
  variant?: 'default' | 'red';
}

export function MacroCard({ label, value, unit, variant = 'default' }: MacroCardProps) {
  return (
    <Card variant={variant} className="w-full lg:w-[180px] h-[160px] flex flex-col justify-between p-6">
      <p className="text-[12px] font-black uppercase opacity-70 tracking-tighter">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-[48px] font-bold leading-none">{value}</span>
        <span className="text-[20px] font-bold opacity-30 uppercase">{unit}</span>
      </div>
    </Card>
  );
}