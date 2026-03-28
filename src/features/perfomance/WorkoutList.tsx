import { Card } from "@/components/ui/Card";

export function WorkoutList() {
  const exercises = [
    { id: 1, name: "Supino Reto", sets: "4x", reps: "8-12", load: "90kg", intensity: 5 },
    { id: 2, name: "Desenvolvimento", sets: "3x", reps: "10", load: "40kg", intensity: 4 },
    { id: 3, name: "Elevação Lateral", sets: "4x", reps: "15", load: "12kg", intensity: 3 },
    { id: 4, name: "Tríceps Corda", sets: "3x", reps: "12", load: "30kg", intensity: 2 },
  ];

  return (
    <Card className="flex-1 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="text-[15px] font-black uppercase tracking-tight">Daily Workout / Push Day</p>
        <span className="text-[10px] font-black bg-black text-white px-2 py-1 uppercase">Volume: High</span>
      </div>

      <div className="flex flex-col gap-2">
        {exercises.map((ex) => (
          <div key={ex.id} className="flex items-center justify-between p-4 border border-black/5 hover:bg-black/5 transition-colors group">
            <div className="flex flex-col">
              <span className="text-[15px] font-black uppercase">{ex.name}</span>
              <span className="text-[11px] font-bold text-brand-gray uppercase">
                {ex.sets} {ex.reps} — <span className="text-black">{ex.load}</span>
              </span>
            </div>

            {/* Barrinhas de Intensidade (UI de Game) */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div 
                  key={level}
                  className={`w-1.5 h-4 ${level <= ex.intensity ? 'bg-brand-red' : 'bg-black/10'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-4 border-2 border-dashed border-black/20 text-[12px] font-black uppercase hover:border-black/40 transition-all">
        + Adicionar Exercício
      </button>
    </Card>
  );
}