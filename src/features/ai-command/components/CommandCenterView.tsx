import { EngineStatus } from "./EngineStatus";
import { NeuralProcessor } from "./NeuralProcessor";
import { Card } from "@/components/ui/Card";

export function CommandCenterView() {
  return (
    <div className="flex flex-col gap-12 px-7 lg:px-0 pb-10">
      <section className="flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-[80px] font-black leading-none uppercase tracking-tighter">Command Center</h1>
          <h2 className="text-[80px] font-medium leading-[0.9] text-brand-gray tracking-[-0.02em]">Neural Engine Status</h2>
        </div>
        <EngineStatus />
      </section>

      <NeuralProcessor />

      <div className="grid grid-cols-12 gap-8">
        {/* Prompt Lab (Terminal) */}
        <div className="col-span-4">
          <Card className="bg-black h-[300px] p-0 overflow-hidden relative border-none">
             <div className="bg-white/10 px-3 py-1 text-[10px] font-mono text-white inline-block">
               PROMPT LAB: TEST YOUR COMMANDS
             </div>
             <div className="p-6 flex items-center justify-center h-full">
                <div className="w-4 h-4 border-r-2 border-b-2 border-brand-blue rotate-45 animate-pulse" />
             </div>
          </Card>
        </div>

        {/* Gráfico de Latência Simulado */}
        <div className="col-span-8">
          <Card className="h-[300px] flex items-end gap-2 p-8">
             {[20, 40, 35, 60, 80, 70, 90, 100].map((h, i) => (
               <div key={i} className="flex-1 bg-brand-blue" style={{ height: `${h}%` }} />
             ))}
          </Card>
        </div>
      </div>
    </div>
  );
}