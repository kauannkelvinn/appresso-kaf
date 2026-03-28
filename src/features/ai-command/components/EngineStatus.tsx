export function EngineStatus() {
  const stats = [
    { label: "GEMINI-1.5-FLASH", status: "ONLINE" },
    { label: "DATABASE", status: "CONNECTED" },
    { label: "API LATENCY", status: "0.42s" },
  ];

  return (
    <div className="flex gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="w-[140px] h-[140px] rounded-full bg-brand-blue flex flex-col items-center justify-center text-center p-4">
          <span className="text-[10px] font-black uppercase leading-tight">{stat.label}:</span>
          <span className="text-[12px] font-black uppercase mt-1">{stat.status}</span>
        </div>
      ))}
    </div>
  );
}