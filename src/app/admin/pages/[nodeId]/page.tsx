import { Suspense } from 'react';
import { AdminPageEditorPage } from '@/site-pages/AdminPageEditorPage';

interface AdminPageEditorRouteProps {
  params: Promise<{ nodeId: string }>;
}

export default function AdminPageEditorRoute({ params }: AdminPageEditorRouteProps) {
  return (
    <Suspense fallback={null}>
      <AdminPageEditorRouteContent params={params} />
    </Suspense>
  );
}

async function AdminPageEditorRouteContent({ params }: AdminPageEditorRouteProps) {
  const { nodeId } = await params;
  return <AdminPageEditorPage nodeId={nodeId} />;
}
