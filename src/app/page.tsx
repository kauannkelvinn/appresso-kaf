import { prisma } from '@/lib/prisma'
import { DashboardView } from "@/features/dashboard/components/DashboardView";
import { APP_USER_ID } from '@/lib/constants';

export default async function Page() {
  const events = await prisma.event.findMany({
    where: { userId: APP_USER_ID },
    orderBy: { createdAt: 'asc' }
  });

  return <DashboardView events={events} />;
}