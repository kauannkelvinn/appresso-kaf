// src/features/wealth/components/CapitalFlow.tsx
import { Card } from "@/components/ui/Card";

export function CapitalFlow() {
  return (
    <div className="relative w-full h-[500px] border border-black/5 bg-brand-bg/20 rounded-brand overflow-hidden">
      {/* Camada do SVG (Linhas de Fluxo) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Linha: Entradas -> Capital Central */}
        <path 
          d="M 150 150 Q 300 150 400 250" 
          stroke="black" strokeWidth="4" fill="none" strokeLinecap="square"
        />
        {/* Linha: Capital Central -> Aportes */}
        <path 
          d="M 500 250 Q 600 250 700 150" 
          stroke="black" strokeWidth="4" fill="none" strokeDasharray="12 8"
        />
        {/* Linha: Capital Central -> Despesas */}
        <path 
          d="M 500 250 Q 600 250 700 350" 
          stroke="black" strokeWidth="4" fill="none"
        />
      </svg>

      {/* NÓS (Cards Circulares/Quadrados do Fluxo) */}
      
      {/* Entrada */}
      <div className="absolute top-[120px] left-[50px] flex flex-col items-center">
        <div className="w-20 h-20 bg-black text-white flex items-center justify-center font-black text-[10px] uppercase text-center p-2">
          Entradas<br/>Mensais
        </div>
        <span className="text-[12px] font-black mt-2">R$ 12.500</span>
      </div>

      {/* HUB CENTRAL */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-32 h-32 border-4 border-black bg-brand-bg flex items-center justify-center">
          <span className="text-[14px] font-black uppercase text-center">Capital<br/>Disponível</span>
        </div>
      </div>

      {/* Aportes (Investimentos) */}
      <div className="absolute top-[120px] right-[50px] flex flex-col items-center">
        <div className="w-20 h-20 border-2 border-brand-blue bg-white flex items-center justify-center font-black text-[10px] uppercase text-brand-blue text-center p-2">
          Aportes<br/>IA Portfolio
        </div>
        <span className="text-[12px] font-black mt-2 text-brand-blue">R$ 4.200</span>
      </div>

      {/* Despesas */}
      <div className="absolute bottom-[100px] right-[50px] flex flex-col items-center">
        <div className="w-20 h-20 border-2 border-brand-red bg-white flex items-center justify-center font-black text-[10px] uppercase text-brand-red text-center p-2">
          Fixed<br/>Expenses
        </div>
        <span className="text-[12px] font-black mt-2 text-brand-red">R$ 6.800</span>
      </div>
    </div>
  );
}