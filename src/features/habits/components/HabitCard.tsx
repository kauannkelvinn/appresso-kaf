"use client";

import { useOptimistic, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { toggleHabitAction } from "@/app/actions";

interface HabitCardProps {
  title: string;
  subtitle: string;
  streak: number;
  completedDays: boolean[];
  variant?: 'default' | 'red';
  originalName: string;
}

export function HabitCard({ title, subtitle, streak, completedDays, variant = 'default', originalName }: HabitCardProps) {
  const [isPending, startTransition] = useTransition();

  const [optimisticDays, toggleOptimisticDay] = useOptimistic(
    completedDays,
    (currentDays, clickedIndex: number) => {
      const newDays = [...currentDays];
      newDays[clickedIndex] = !newDays[clickedIndex];
      return newDays;
    }
  );

  const handleSquareClick = (index: number) => {
    const dbDayMapping = [1, 2, 3, 4, 5, 6, 0];
    const dayToToggleDB = dbDayMapping[index];

    startTransition(async () => {
      toggleOptimisticDay(index);
      
      await toggleHabitAction(originalName, 'dev_user_kaf', dayToToggleDB);
    });
  };

  return (
    <Card variant={variant} className="w-[280px] h-[160px] flex flex-col justify-between p-6">
      <div className="flex flex-col">
        <p className="text-[12px] font-black uppercase leading-tight opacity-70">{title}</p>
        <p className="text-[15px] font-black uppercase leading-tight">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-1.5">
          {optimisticDays.map((isDone, i) => (
            <div 
              key={i} 
              onClick={() => handleSquareClick(i)}
              className={`w-6 h-6 border border-black/20 rounded-[4px] cursor-pointer transition-colors hover:scale-110 ${isDone ? 'bg-black' : 'bg-transparent'} ${isPending ? 'opacity-80' : 'opacity-100'}`} 
            />
          ))}
        </div>

        <div className="flex items-center justify-end gap-1 text-[11px] font-black uppercase">
          <span>🔥 {streak} DIAS</span>
        </div>
      </div>
    </Card>
  );
}