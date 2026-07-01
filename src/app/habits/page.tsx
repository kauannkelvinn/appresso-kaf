import { HabitsView } from "@/features/habits/components/HabitsView";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Deep Focus | Appresso Kaf",
};

export default async function HabitsPage() {
  // Busca os hábitos reais do banco de dados atrelados ao usuário dev
  const habits = await prisma.habit.findMany({
    where: { userIdentifier: 'dev_user_kaf' },
    orderBy: { updatedAt: 'desc' }
  });

  return <HabitsView initialHabits={habits} />;
}