import DashboardLayout from '@/components/layout/DashboardLayout';
import PomodoroTimer from '@/components/timer/PomodoroTimer';

export default function TimerPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 py-4">
        <div className="text-center space-y-3">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
            Timer Fokus
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto text-base lg:text-lg font-medium">
            Tetapkan target, singkirkan distraksi, dan mulai belajar dengan penuh konsentrasi.
          </p>
        </div>
        <div className="w-full px-4">
          <PomodoroTimer />
        </div>
      </div>
    </DashboardLayout>
  );
}
