// src/features/ai-command/components/PromptLab.tsx
import { Card } from "@/components/ui/Card";

export function PromptLab() {
  return (
    <Card className="bg-black h-[300px] p-0 overflow-hidden relative border-none shadow-2xl">
      {/* Header do Terminal */}
      <div className="bg-white/10 px-4 py-2 flex justify-between items-center">
        <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
          PROMPT LAB: TEST_ENVIRONMENT / V1.0
        </span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Área de Output/Input */}
      <div className="p-6 font-mono text-[13px] flex flex-col gap-2">
        <div className="flex gap-2 text-brand-blue">
          <span className="shrink-0">{">"}</span>
          <p className="text-white/80 uppercase">Aguardando comando de entrada...</p>
        </div>
        
        <div className="flex gap-2 text-white mt-4">
          <span className="shrink-0 text-brand-red">{">"}</span>
          <div className="flex items-center gap-1">
            <span className="uppercase font-bold">Inicie um novo teste</span>
            <span className="w-2 h-4 bg-brand-blue animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer / Helper */}
      <div className="absolute bottom-4 left-6">
        <p className="text-[9px] font-mono text-white/20 uppercase">
          [ENTER] ENVIAR | [ESC] LIMPAR LOG
        </p>
      </div>
    </Card>
  );
}