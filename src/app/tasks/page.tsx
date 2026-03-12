import DashboardLayout from '@/components/layout/DashboardLayout';
import TaskManager from '@/components/task/TaskManager';

export default function TasksPage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <TaskManager />
      </div>
    </DashboardLayout>
  );
}
