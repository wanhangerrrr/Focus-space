import DashboardLayout from '@/components/layout/DashboardLayout';
import PomodoroTimer from '@/components/timer/PomodoroTimer';

export default function TimerPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Focus Timer</h2>
          <p className="text-foreground/60 max-w-md">Tetapkan target, singkirkan distraksi, dan mulai belajar dengan penuh konsentrasi.</p>
        </div>
        <PomodoroTimer />
      </div>
    </DashboardLayout>
  );
}
