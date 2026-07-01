import { HabitsView } from "@/features/habits/components/HabitsView";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Deep Focus | Appresso Kaf",
};

export default async function HabitsPage() {
  const habits = await prisma.habit.findMany({
    where: { userId: 'dev_user_kaf' },
    orderBy: { updatedAt: 'desc' }
  });

  return <HabitsView initialHabits={habits} />;
}