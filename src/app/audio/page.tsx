import DashboardLayout from '@/components/layout/DashboardLayout';
import AudioStation from '@/components/audio/AudioStation';

export default function AudioPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Focus Audio Station</h2>
          <p className="text-foreground/60">Ciptakan suasana belajar yang tenang dengan koleksi ambient audio kami.</p>
        </div>
        <AudioStation />
      </div>
    </DashboardLayout>
  );
}
