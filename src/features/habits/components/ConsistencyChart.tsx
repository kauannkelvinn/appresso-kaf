// src/features/habits/components/ConsistencyChart.tsx
import { Card } from "@/components/ui/Card";

export function ConsistencyChart() {
  // Mock de dados: alturas das barras (0 a 100)
  const data = [40, 60, 45, 90, 100, 80, 40, 60, 70, 85, 40, 30, 90, 100, 80, 60, 40, 50, 90, 70, 100, 80, 60, 40, 30, 50, 70, 90, 85, 100];

  return (
    <Card className="flex-1 h-[300px] flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <p className="text-[15px] font-black uppercase tracking-tight">
          Overall<br />Consistency
        </p>
        <div className="text-right">
          <p className="text-[10px] font-bold text-brand-gray">ÚLTIMOS 30 DIAS</p>
          <p className="text-[20px] font-black uppercase">88% AVG</p>
        </div>
      </div>

      {/* Área das Barras */}
      <div className="flex items-end justify-between gap-1 h-[140px] w-full">
        {data.map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-black min-w-[4px] max-w-[12px] transition-all hover:bg-brand-blue"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      {/* Legenda de meses/semanas */}
      <div className="flex justify-between mt-4 text-[10px] font-black uppercase opacity-30">
        <span>01 Mar</span>
        <span>15 Mar</span>
        <span>Hoje</span>
      </div>
    </Card>
  );
}