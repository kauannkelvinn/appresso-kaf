import { HabitCard } from "./HabitCard";
import { Card } from "@/components/ui/Card";
import { ConsistencyChart } from "./ConsistencyChart";
import { MicroTasks } from "./MicroTasks";

interface Habit {
  id: string;
  name: string;
  completedDays: number[];
}

interface HabitsViewProps {
  initialHabits?: Habit[];
}

export function HabitsView({ initialHabits = [] }: HabitsViewProps) {
  const mapCompletedDays = (dbDays: number[]) => {
    const week = [1, 2, 3, 4, 5, 6, 0];
    return week.map(day => dbDays.includes(day));
  };

  const habitsToDisplay =
    initialHabits.length > 0
      ? initialHabits
      : [
          { id: "mock-1", name: "Beber 4L Água", completedDays: [] },
          { id: "mock-2", name: "Treinar Musculação", completedDays: [] },
        ];

  return (
    <div className="flex flex-col gap-12 px-7 lg:px-0 pb-10">
      <section className="flex flex-col">
        <h1 className="text-[80px] font-black leading-none uppercase tracking-tighter">Deep Focus</h1>
        <h2 className="text-[80px] font-medium leading-[0.9] text-brand-gray tracking-[-0.02em]">Sua consistência hoje</h2>
      </section>

      <div className="grid grid-cols-12 gap-10">
        
        <div className="col-span-9 flex flex-col gap-10">
          
          <div className="flex flex-wrap gap-6">
            
            {habitsToDisplay.map((habit) => {
              const [title, ...subtitleArr] = habit.name.split(' ');
              const subtitle = subtitleArr.join(' ');
              
              return (
                <HabitCard 
                  key={habit.id}
                  title={title} 
                  subtitle={subtitle || habit.name} 
                  streak={habit.completedDays.length} 
                  completedDays={mapCompletedDays(habit.completedDays)} 
                  variant={habit.name.toLowerCase().includes('trein') ? 'red' : 'default'}
                  originalName={habit.name}
                />
              );
            })}
            
            <Card className="w-[200px] h-[160px] flex items-center justify-center border-dashed opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
              <p className="text-[13px] font-black uppercase text-center">+ Novo<br/>Hábito</p>
            </Card>
          </div>

          <ConsistencyChart />
        </div>

        <div className="col-span-3">
          <MicroTasks />
        </div>
      </div>
    </div>
  );
}