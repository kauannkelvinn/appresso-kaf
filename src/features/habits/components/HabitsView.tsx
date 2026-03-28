import { HabitCard } from "./HabitCard";
import { Card } from "@/components/ui/Card";
import { ConsistencyChart } from "./ConsistencyChart";
import { MicroTasks } from "./MicroTasks";

export function HabitsView() {
  return (
    <div className="flex flex-col gap-12 px-7 lg:px-0 pb-10">
      {/* TÍTULOS DA PÁGINA */}
      <section className="flex flex-col">
        <h1 className="text-[80px] font-black leading-none uppercase tracking-tighter">Deep Focus</h1>
        <h2 className="text-[80px] font-medium leading-[0.9] text-brand-gray tracking-[-0.02em]">Sua consistência hoje</h2>
      </section>

      {/* GRID DE CONTEÚDO */}
      <div className="grid grid-cols-12 gap-10">
        
        {/* COLUNA DA ESQUERDA (HÁBITOS + GRÁFICO) */}
        <div className="col-span-9 flex flex-col gap-10">
          
          {/* LINHA DE HÁBITOS */}
          <div className="flex flex-wrap gap-6">
            <HabitCard 
              title="Beber 4L" 
              subtitle="Água" 
              streak={14} 
              completedDays={[true, true, false, false, false, false, false]} 
            />
            <HabitCard 
              variant="red"
              title="Treinar" 
              subtitle="Musculação" 
              streak={14} 
              completedDays={[true, true, true, false, false, false, false]} 
            />
            
            {/* BOTÃO NOVO HÁBITO */}
            <Card className="w-[200px] h-[160px] flex items-center justify-center border-dashed opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
              <p className="text-[13px] font-black uppercase text-center">+ Novo<br/>Hábito</p>
            </Card>
          </div>

          {/* GRÁFICO DE CONSISTÊNCIA 30 DIAS */}
          <ConsistencyChart />
        </div>

        {/* COLUNA DA DIREITA (MICRO-TASKS) */}
        <div className="col-span-3">
          <MicroTasks />
        </div>
      </div>
    </div>
  );
}