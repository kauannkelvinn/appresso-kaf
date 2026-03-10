'use client';
import { Card } from "@/components/ui/Card";


export default function Dashboard() {
  return (
    <div className="flex flex-col gap-12">
      {/* 1. Titulos da pagina */}
      <section className="flex flex-col">
        <h1 className="text-[80px] font-bold leading]">Appreso Kaf</h1>
        <h2 className="text-[80px] font-medium leading-[0.9] text-brand-gray tracking-[-0.02em]">Olá, Kauan</h2>
      </section>

      {/* 2. grid de stats */}

      <div className="grid grid-cols-12 gap-6">
        {/* card de calorias */}
        <Card variant="red" className="col-span-4 h-[180px]">
          <div>
            <p className="text-[15px] font-black uppercase leading-tight">Calorias<br />Hoje</p>
          </div>
          <div className="py-4">
            <p className="text-[50px] font-bold leading-none">2.<span className="opacity-50">450</span></p>
            <p className="text-[15px] font-black opacity-40 leading-none">Meta: 2.800 kcal</p>
          </div>
        </Card>

        {/* card de tempo salvo */}
        <Card className="col-span-3 flex flex-col justify-between h-[180px]">
          <div>
            <p className="text-[15px] font-black uppercase leading-tight">Time<br />Saved</p>
          </div>
          <div className="py-4">
            <p className="text-[50px] font-bold leading-none">1.<span className="opacity-50">6h</span></p>
            <p className="text-[15px] font-black opacity-40">Efficiency ↑ 12%</p>
          </div>
        </Card>
      </div>
    </div>
  )
}