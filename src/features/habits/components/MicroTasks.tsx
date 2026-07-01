"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";

interface Task {
  id: string;
  title: string;
  done: boolean;
}

export function MicroTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Revisar PR da MG Company", done: true },
    { id: "2", title: "LeetCode: 2 Easy", done: false },
    { id: "3", title: "Estudar Server Actions", done: false },
  ]);
  
  const [newTaskName, setNewTaskName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // O Atalho de Produtividade: Aperte 'N' para focar no input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ignora se o usuário já estiver digitando em algum outro input
      if (document.activeElement?.tagName === 'INPUT') return;
      
      if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskName.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), title: newTaskName, done: false }]);
      setNewTaskName("");
    }
  };

  return (
    <Card className="h-full flex flex-col gap-6 p-6">
      <p className="text-[15px] font-black uppercase tracking-tight">
        Micro Tasks<br />/ Queue
      </p>

      <div className="flex flex-col gap-4 overflow-y-auto">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-3 group cursor-pointer"
          >
            {/* Checkbox Brutalista Animado */}
            <div className={`
              w-5 h-5 flex-shrink-0 border-2 border-black flex items-center justify-center transition-colors duration-200
              ${task.done ? 'bg-black text-white' : 'bg-transparent'}
            `}>
              {task.done && <span className="text-[10px]">✓</span>}
            </div>
            
            <span className={`
              text-[13px] font-bold uppercase tracking-tight transition-all duration-200
              ${task.done ? 'line-through opacity-30' : 'opacity-100'}
            `}>
              {task.title}
            </span>
          </div>
        ))}
      </div>

      {/* Input de nova task 100% Funcional */}
      <div className="mt-auto pt-6 border-t border-black/10">
        <p className="text-[10px] font-black opacity-30 uppercase mb-2">Pressione &apos;N&apos; para nova task</p>
        <input 
          ref={inputRef}
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyDown={handleAddTask}
          className="w-full h-10 px-3 border border-black/20 rounded-[4px] bg-transparent text-[12px] font-bold uppercase outline-none focus:border-black transition-colors"
        />
      </div>
    </Card>
  );
}