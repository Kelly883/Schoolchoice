import { AdminLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, EmptyState } from '@/components/ui';

export default function GalleryPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader title="Gallery" subtitle="Manage photo and video gallery." />
        <Card>
          <CardContent>
            <EmptyState
              title="No gallery items"
              description="Gallery items will appear here once uploaded."
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
