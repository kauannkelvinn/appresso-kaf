import { MacroCard } from "./MacroCard";
import { WorkoutList } from "./WorkoutList";
import { WeightChart } from "./WeightChart";
import { Card } from "@/components/ui/Card";

export function PerformanceView() {
  return (
    <div className="flex flex-col gap-12 px-7 lg:px-0 pb-10">
      <section className="flex flex-col">
        <h1 className="text-[80px] font-black leading-none uppercase tracking-tighter">Performance</h1>
        <h2 className="text-[80px] font-medium leading-[0.9] text-brand-gray tracking-[-0.02em]">Seu corpo sob controle</h2>
      </section>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Lado Esquerdo: Macros e Treino */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-wrap gap-4">
            <MacroCard label="Proteína" value="450" unit="g" />
            <MacroCard label="Carbo" value="450" unit="g" />
            <MacroCard variant="red" label="Faltam" value="2.450" unit="kcal" />
          </div>
          <WorkoutList /> {/* Componente com a lista de exercícios */}
        </div>

        {/* Lado Direito: Gráfico de Peso */}
        <div className="lg:col-span-5">
          <WeightChart />
        </div>
      </div>
    </div>
  );
}