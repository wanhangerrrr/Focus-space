import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsOverview from '@/components/stats/StatsOverview';

export default function StatsPage() {
  return (
    <DashboardLayout>
      <StatsOverview />
    </DashboardLayout>
  );
}
