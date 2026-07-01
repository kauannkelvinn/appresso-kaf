"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { createHabitAction } from "@/app/actions";

export function NewHabitCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && habitName.trim() !== '') {
      setIsPending(true);
      await createHabitAction(habitName, 'dev_user_kaf');
      setHabitName("");
      setIsEditing(false);
      setIsPending(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setHabitName("");
    }
  };

  return (
    <Card
      className={`w-[200px] h-[160px] flex items-center justify-center border-dashed transition-all
        ${isEditing ? 'border-black opacity-100' : 'border-black/30 opacity-50 hover:opacity-100 hover:border-black/50'}
        ${isPending ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <div 
        onClick={() => !isEditing && setIsEditing(true)}
        className="w-full h-full flex items-center justify-center cursor-pointer"
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setIsEditing(false);
              setHabitName("");
            }}
            placeholder="NOME DO HÁBITO"
            className="w-[90%] bg-transparent text-[13px] font-black uppercase text-center outline-none placeholder:text-black/30"
            disabled={isPending}
          />
        ) : (
          <p className="text-[13px] font-black uppercase text-center">
            {isPending ? 'CRIANDO...' : '+ Novo\nHábito'}
          </p>
        )}
      </div>
    </Card>
  );
}