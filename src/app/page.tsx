import { prisma } from '@/lib/prisma'
import { DashboardView } from "@/features/dashboard/components/DashboardView";

export default async function Page() {
  const events = await prisma.event.findMany({
    where: { userId: 'dev_user_kaf' },
    orderBy: { createdAt: 'asc' }
  });

  return <DashboardView events={events} />;
}