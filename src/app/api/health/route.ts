import { connection } from 'next/server';
import { loadCmsStore } from '@/lib/cmsStore';

export async function GET() {
  await connection();
  const store = loadCmsStore();
  return Response.json({
    ok: true,
    pagesCount: store.pages.length,
    enquiriesCount: store.enquiries.length,
  });
}
