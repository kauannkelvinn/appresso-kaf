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

      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* ai command center */}
        <Card className="col-span-4 h-[400px] flex flex-col gap-4">
          <p className="text-[15px] font-black uppercase">AI Command Center</p>
          <div className="bg-brand-bg/50 rounded-brand p-6 flex-1 flex flex-col justify-end">
            {/* simulacao de log da ia*/}
            <p className="text-xs font-mono text-brand-gray">IA PROCESSING (0.3s)</p>
            <div className="h-px w-full bg-brand-blue/20" />
            <p className="text-sm font-bold">Reunião agendada para as 14:00h</p>
            <p className="text-[10px] font-mono text-brand-gray flex items-center gap-1">
              <span className="w-1 h-1 bg-green-500 rounded-full inline-block" />
              SYSTEM ONLINE
            </p>
          </div>
        </Card>

        {/* ACTIVIY EVOLUTION */}
        <Card className="col-span-8 h-[400px] flex flex-col overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <p className="text-[15px] font-black uppercase tracking-tight">Activity Evolution</p>
            <div className="flex gap-8 text-[12px] font-black">
              {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map(dia => (
                <span key={dia}>{dia}</span>
              ))}
            </div>
          </div>

          {/*area do grafico*/}
          <div className="flex-1 w-full relative">
            {/* componente svg para linha brutalista */}
            <svg
              viewBox="0 0 700 280"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="90" x2="700" y2="90" stroke="black" strokeOpacity="0.05" />
              <line x1="0" y1="180" x2="700" y2="180" stroke="black" strokeOpacity="0.05" />
              <polyline
                fill="none"
                className="stroke-brand-black stroke-[4]"
                points="
                  0,230 
                  116,190 
                  232,240 
                  348,130 
                  464,170 
                  580,80 
                  700,100
                "
                strokeLinecap="square"
              />
            </svg>
            {/* badge do status */}
            <div className="absolute right-0 top-0 text-right">
              <p className="text-[10px] font-bold">Hoje:</p>
              <p className="text-sm font-black uppercase">12 Tasks</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}