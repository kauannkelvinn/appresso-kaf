import { Card } from "@/components/ui/Card";

export function HeroStats() {
  return (
    <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4 items-start pt-4 w-full">
      <Card variant="red" className="w-full lg:flex-1 h-[160px]">
        <p className="text-[13px] font-black uppercase leading-tight">Calorias<br />Hoje</p>
        <div className="py-3">
          <p className="text-[40px] lg:text-[48px] font-bold leading-none">2.<span className="opacity-50">450</span></p>
          <p className="text-[13px] font-black opacity-40 leading-none">Meta: 2.800 kcal</p>
        </div>
      </Card>

      <Card className="w-full lg:flex-1 flex flex-col justify-between h-[160px]">
        <p className="text-[13px] font-black uppercase leading-tight">Time<br />Saved</p>
        <div className="py-3">
          <p className="text-[40px] lg:text-[48px] font-bold leading-none">1.<span className="opacity-50">6h</span></p>
          <p className="text-[13px] font-black opacity-40">Efficiency ↑ 12%</p>
        </div>
      </Card>
    </div>
  );
}