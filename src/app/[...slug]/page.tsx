import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { DynamicSitemapPage } from '@/site-pages/DynamicSitemapPage';

interface SitemapRouteProps {
  params: Promise<{ slug: string[] }>;
}

export default function SitemapRoute({ params }: SitemapRouteProps) {
  return (
    <Suspense fallback={null}>
      <SitemapRouteContent params={params} />
    </Suspense>
  );
}

async function SitemapRouteContent({ params }: SitemapRouteProps) {
  const { slug } = await params;
  const pathname = `/${slug.join('/')}`;

  if (pathname === '/sitemap') redirect('/');
  if (pathname === '/ar/sitemap') redirect('/ar');

  return <DynamicSitemapPage pathname={pathname} />;
}
