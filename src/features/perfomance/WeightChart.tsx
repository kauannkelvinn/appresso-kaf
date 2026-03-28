import { Card } from "@/components/ui/Card";

export function WeightChart() {
  const candles = [
    { h: 60, c: 'black', offset: 20 },
    { h: 40, c: 'red', offset: 40 },
    { h: 50, c: 'red', offset: 35 },
    { h: 70, c: 'black', offset: 15 },
    { h: 30, c: 'red', offset: 50 },
    { h: 45, c: 'black', offset: 30 },
    { h: 90, c: 'green', offset: 5 }, // Superavit/Ganho
  ];

  return (
    <Card className="flex-1 h-[350px] p-8">
      <p className="text-[13px] font-black uppercase mb-10">Histórico de Peso</p>
      
      <div className="flex items-end justify-between h-[180px] gap-2 lg:gap-4">
        {candles.map((candle, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group relative">
            {/* Pavio da vela */}
            <div className="absolute w-[1px] h-full bg-black/20" />
            {/* Corpo da vela */}
            <div 
              className={`w-full max-w-[12px] lg:max-w-[20px] transition-all
                ${candle.c === 'red' ? 'bg-brand-red' : candle.c === 'green' ? 'bg-green-600' : 'bg-black'}
              `}
              style={{ height: `${candle.h}%`, marginBottom: `${candle.offset}%` }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}