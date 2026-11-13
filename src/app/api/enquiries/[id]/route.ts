import { loadCmsStore, saveCmsStore } from '@/lib/cmsStore';
import type { EnquiryStatus } from '@/types/cms';

interface EnquiryRouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: EnquiryRouteContext) {
  const { id } = await context.params;
  const store = loadCmsStore();
  const index = store.enquiries.findIndex((enquiry) => enquiry.id === id);
  if (index === -1) {
    return Response.json({ error: 'Enquiry not found' }, { status: 404 });
  }

  const body = (await request.json()) as { status?: EnquiryStatus };
  store.enquiries[index] = {
    ...store.enquiries[index],
    status: body.status || store.enquiries[index].status,
  };
  saveCmsStore(store);
  return Response.json({ enquiry: store.enquiries[index] });
}
