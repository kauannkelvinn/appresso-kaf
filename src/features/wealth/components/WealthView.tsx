// src/features/wealth/components/WealthView.tsx
'use client';
import { CapitalFlow } from "./CapitalFlow";
import { TransactionLog } from "./TransactionLog";
import { AssetTicker } from "./AssetTicker";

export function WealthView() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-180px)]">
      <div className="flex flex-col gap-12 px-7 lg:px-0 flex-1">
        {/* Títulos */}
        <section className="flex flex-col">
          <h1 className="text-[48px] lg:text-[80px] font-black leading-none uppercase tracking-tighter">Wealth</h1>
          <h2 className="text-[48px] lg:text-[80px] font-medium leading-[0.9] text-brand-gray tracking-[-0.02em]">Gestão de Capital & Fluxo</h2>
        </section>

        {/* Grid Principal */}
        <div className="grid grid-cols-12 gap-8 lg:gap-10 items-stretch mb-12">
          <div className="col-span-12 lg:col-span-8">
            <CapitalFlow />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <TransactionLog />
          </div>
        </div>
      </div>

      {/* Ticker fixo no final do fluxo da página */}
      <div className="mt-auto">
        <AssetTicker />
      </div>
    </div>
  );
}