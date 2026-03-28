// src/features/wealth/components/TransactionLog.tsx
import { Card } from "@/components/ui/Card";

export function TransactionLog() {
  const transactions = [
    { id: 1, desc: "Uber Trip", value: "-R$ 24,90", cat: "Transporte", status: "IA_PROCESSED" },
    { id: 2, desc: "Restaurante", value: "-R$ 89,00", cat: "Alimentação", status: "IA_PROCESSED" },
    { id: 3, desc: "Salary MG Co", value: "+R$ 4.500", cat: "Income", status: "PENDING" },
  ];

  return (
    <Card className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <p className="text-[15px] font-black uppercase tracking-tight">Transaction<br />Analyzer</p>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {transactions.map((t) => (
          <div key={t.id} className="p-3 border border-black/10 flex flex-col gap-1 hover:bg-black/5 transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-black uppercase">{t.desc}</span>
              <span className={`text-[13px] font-black ${t.value.includes('+') ? 'text-green-600' : ''}`}>{t.value}</span>
            </div>
            <div className="flex justify-between items-center opacity-40">
              <span className="text-[9px] font-mono uppercase">{t.status}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{t.cat}</span>
            </div>
          </div>
        ))}
      </div>

      {/* IA Command Prompt */}
      <div className="mt-auto pt-6 border-t-2 border-black/5">
        <p className="text-[10px] font-black opacity-30 uppercase mb-3">Ask AI to categorize or alert...</p>
        <div className="w-full h-12 bg-black text-white p-3 flex items-center justify-between">
          <span className="text-[11px] font-mono opacity-50"># DIGITE O COMANDO...</span>
          <span className="text-[11px] font-mono">_</span>
        </div>
      </div>
    </Card>
  );
}