// src/features/wealth/components/AssetTicker.tsx

export function AssetTicker() {
  const assets = [
    { name: "BTC", price: "U$ 69,420", change: "+3.4%", color: "text-green-500" },
    { name: "ETH", price: "U$ 3,812", change: "+1.2%", color: "text-green-500" },
    { name: "SOL", price: "U$ 162", change: "-0.5%", color: "text-brand-red" },
    { name: "NDX", price: "18,210", change: "+0.8%", color: "text-green-500" },
    { name: "SPX", price: "5,214", change: "+0.2%", color: "text-green-500" },
  ];

  return (
    // mt-auto empurra a barra para o final da tela flex
    <div className="w-full bg-black py-3 px-6 mt-auto border-t-2 border-brand-black/20">
      <div className="flex gap-12 overflow-x-auto no-scrollbar items-center">
        {assets.map((asset, i) => (
          <div key={i} className="flex gap-3 text-[13px] font-black uppercase text-white shrink-0 items-center">
            <span className="opacity-40">{asset.name}</span>
            <span>{asset.price}</span>
            <span className={asset.color}>{asset.change}</span>
            {/* Divisor brutalista entre assets */}
            {i < assets.length - 1 && <div className="w-px h-4 bg-white/10 ml-4" />}
          </div>
        ))}
        
        {/* Simulação de loop infinito (opcional, para efeito visual) */}
        {assets.map((asset, i) => (
          <div key={`loop-${i}`} className="flex gap-3 text-[13px] font-black uppercase text-white shrink-0 items-center opacity-30">
            <span className="opacity-40">{asset.name}</span>
            <span>{asset.price}</span>
            <span className={asset.color}>{asset.change}</span>
            {i < assets.length - 1 && <div className="w-px h-4 bg-white/10 ml-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}