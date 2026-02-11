'use client';

import { useState } from 'react';
export interface Habit {
  id: string;
  name: string;
  completedDays: number[];
}

interface HabitGridProps {
  habits: Habit[];
}

export function HabitGrid({ habits: initialHabits }: HabitGridProps) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const toggleDay = (habitId: string, dayIndex: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDays.includes(dayIndex);
        return {
          ...habit,
          completedDays: isCompleted 
            ? habit.completedDays.filter(d => d !== dayIndex)
            : [...habit.completedDays, dayIndex]
        };
      }
      return habit;
    }));
  };

  return (
    <div className="w-full bg-[#0D0D0D] border border-white/5 p-4 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Grade de Hábitos</h3>
        <div className="flex gap-1">
          {weekDays.map((day, i) => (
            <span key={i} className="w-7 text-center text-[8px] text-gray-700 font-mono font-bold">{day}</span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="flex justify-between items-center group">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-tighter group-hover:text-white transition-colors">
              {habit.name}
            </span>
            
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => {
                const isCompleted = habit.completedDays.includes(i);
                return (
                  <button 
                    key={i}
                    onClick={() => toggleDay(habit.id, i)}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer outline-none ${
                      isCompleted 
                        ? 'bg-kaf-red/20 border-kaf-red shadow-[0_0_10px_rgba(123,10,10,0.4)]' 
                        : 'border-white/5 bg-transparent hover:border-white/20'
                    }`}
                  >
                    {isCompleted && <div className="w-1.5 h-1.5 rounded-full bg-kaf-red animate-pulse" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}