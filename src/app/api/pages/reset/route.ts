import { createInitialStore, saveCmsStore } from '@/lib/cmsStore';

export function POST() {
  const store = createInitialStore();
  saveCmsStore(store);
  return Response.json({ pages: store.pages, enquiries: store.enquiries });
}
