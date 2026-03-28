// src/features/habits/components/MicroTasks.tsx
import { Card } from "@/components/ui/Card";

export function MicroTasks() {
  const tasks = [
    { id: 1, title: "Revisar PR da MG Company", done: true },
    { id: 2, title: "LeetCode: 2 Easy", done: false },
    { id: 3, title: "Comprar passagens SP", done: false },
    { id: 4, title: "Estudar Server Actions", done: false },
    { id: 5, title: "Drink Water (Reset)", done: true },
  ];

  return (
    <Card className="h-full flex flex-col gap-6">
      <p className="text-[15px] font-black uppercase tracking-tight">
        Micro Tasks<br />/ Queue
      </p>

      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 group cursor-pointer">
            {/* Checkbox Brutalista */}
            <div className={`
              w-5 h-5 border-2 border-black flex items-center justify-center transition-colors
              ${task.done ? 'bg-black text-white' : 'bg-transparent'}
            `}>
              {task.done && <span className="text-[10px]">✓</span>}
            </div>
            
            <span className={`
              text-[13px] font-bold uppercase tracking-tight
              ${task.done ? 'line-through opacity-30' : 'opacity-100'}
            `}>
              {task.title}
            </span>
          </div>
        ))}
      </div>

      {/* Input de nova task simulado */}
      <div className="mt-auto pt-6 border-t border-black/10">
        <p className="text-[10px] font-black opacity-30 uppercase mb-2">Pressione &apos;N&apos; para nova task</p>
        <div className="h-10 border border-black/20 rounded-[4px] bg-brand-bg/20" />
      </div>
    </Card>
  );
}