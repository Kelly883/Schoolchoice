import { ParentLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, Badge, EmptyState } from '@/components/ui';

export default function ParentDashboard() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <PageHeader title="Parent Dashboard" subtitle="Welcome back! Here's an overview of your children's school activities." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-neutral-500">Children</div>
              <div className="text-2xl font-bold text-neutral-900">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-neutral-500">Outstanding Fees</div>
              <div className="text-2xl font-bold text-neutral-900">₦0</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-neutral-500">Upcoming Events</div>
              <div className="text-2xl font-bold text-neutral-900">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-neutral-500">Announcements</div>
              <div className="text-2xl font-bold text-neutral-900">0</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="No announcements"
              description="There are no announcements at the moment."
            />
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
