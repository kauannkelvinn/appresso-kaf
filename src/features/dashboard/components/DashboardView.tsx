// src/features/dashboard/components/DashboardView.tsx
'use client';
import { Card } from "@/components/ui/Card";
import { HeroStats } from "./HeroStats";
import { ActivityChart } from "./ActivityChart";

export function DashboardView() {
  return (
    <div className="flex flex-col gap-8 lg:gap-12 px-7 lg:px-0 pb-10">

      {/* 1. Header row: Títulos + Stats */}
      <section className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-[40px] items-start">
        <div className="lg:col-span-5 flex flex-col">
          <h1 className="text-[48px] lg:text-[80px] font-bold leading-none">Appresso Kaf</h1>
          <h2 className="text-[48px] lg:text-[80px] font-medium leading-[0.9] text-brand-gray tracking-[-0.02em]">Olá, Kauan</h2>
        </div>

        <HeroStats />
      </section>

      {/* 2. Segunda linha: AI Command Center + Activity Evolution */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-[150px]">
        
        {/* AI Command Center (Ainda aqui ou pode virar componente também) */}
        <div className="lg:col-span-4 w-full">
          <Card className="h-[380px] lg:h-[400px] flex flex-col gap-4">
            <p className="text-[15px] font-black uppercase">AI Command Center</p>
            <div className="bg-brand-bg/50 rounded-brand p-6 flex-1 flex flex-col justify-end">
              <p className="text-xs font-mono text-brand-gray">IA PROCESSING (0.3s)</p>
              <div className="h-px w-full bg-brand-blue/20" />
              <p className="text-sm font-bold">Reunião agendada para as 14:00h</p>
              <p className="text-[10px] font-mono text-brand-gray flex items-center gap-1">
                <span className="w-1 h-1 bg-green-500 rounded-full inline-block" />
                SYSTEM ONLINE
              </p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 w-full">
          <ActivityChart />
        </div>
      </div>
    </div>
  )
}