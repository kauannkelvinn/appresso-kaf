import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

export function NeuralProcessor() {
  const jsonCode = `{
  "intent": "FINANCE_EXPENSE",
  "value": 50.00,
  "category": "FOOD",
  "entity": "Outback"
}`;

  return (
    <Card className="flex-1 min-h-[400px] flex items-center justify-around bg-brand-card/30">
      {/* Input Simulado */}
      <div className="bg-brand-gray/20 p-4 rounded-brand border border-black/10">
        <p className="text-[13px] font-medium text-brand-gray italic">
          &quot;ow mano, gastei 50 reais no outback hj&quot;
        </p>
      </div>

      <ArrowRight className="w-12 h-12 text-brand-blue stroke-[3]" />

      {/* Output JSON */}
      <div className="bg-transparent p-6 font-mono text-[14px] leading-relaxed">
        <pre className="text-brand-black">
          <span className="text-brand-red">{`{`}</span>{"\n"}
          {`  "intent": `}<span className="text-brand-red">&quot;FINANCE_EXPENSE&quot;</span>,{`\n`}
          {`  "value": `}<span className="text-brand-red">50.00</span>,{`\n`}
          {`  "category": `}<span className="text-brand-red">&quot;FOOD&quot;</span>,{`\n`}
          {`  "entity": `}<span className="text-brand-red">&quot;Outback&quot;</span>{"\n"}
          <span className="text-brand-red">{`}`}</span>
        </pre>
      </div>
    </Card>
  );
}