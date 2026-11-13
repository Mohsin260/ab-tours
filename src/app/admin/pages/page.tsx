import { Suspense } from 'react';
import { AdminPagesListPage } from '@/site-pages/AdminPagesListPage';

export default function AdminPagesRoute() {
  return (
    <Suspense>
      <AdminPagesListPage />
    </Suspense>
  );
}
