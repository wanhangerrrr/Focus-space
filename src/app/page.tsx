import DashboardLayout from '@/components/layout/DashboardLayout';
import PomodoroTimer from '@/components/timer/PomodoroTimer';
import TaskManager from '@/components/task/TaskManager';
import AudioStation from '@/components/audio/AudioStation';
import DailyQuote from '@/components/ui/DailyQuote';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Welcome & Stats */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Selamat Datang, <span className="text-gradient">Hafiz</span>
            </h1>
            <p className="text-foreground/60 text-lg">
              Siap untuk sesi belajar produktif hari ini?
            </p>
          </div>

          <DailyQuote />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Waktu Fokus', value: '2j 10m', icon: null },
              { label: 'Sesi Selesai', value: '4', icon: null },
              { label: 'Streak', value: '5 Hari', icon: null },
            ].map((stat, i) => (
              <div key={i} className="glass-morphism p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-sm font-medium text-foreground/50">{stat.label}</span>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
            ))}
          </div>

          <TaskManager />
        </div>

        {/* Right Column - Timer & Quick Actions */}
        <div className="lg:col-span-4 space-y-8">
          <PomodoroTimer variant="compact" />
          <AudioStation />
        </div>
      </div>
    </DashboardLayout>
  );
}
