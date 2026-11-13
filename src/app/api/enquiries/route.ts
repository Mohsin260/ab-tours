import { loadCmsStore, saveCmsStore } from '@/lib/cmsStore';
import type { EnquiryRecord } from '@/types/cms';

export function GET() {
  return Response.json({ enquiries: loadCmsStore().enquiries });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<EnquiryRecord>;
  if (!body.name || !body.email) {
    return Response.json({ error: 'Name and email are required' }, { status: 400 });
  }

  const store = loadCmsStore();
  const created: EnquiryRecord = {
    id: `ENQ-${Math.floor(1050 + Math.random() * 8900)}`,
    type: body.type || 'trip',
    name: body.name,
    email: body.email,
    phone: body.phone || '',
    company: body.company || '',
    originCountry: body.originCountry || 'United Arab Emirates',
    destinations: Array.isArray(body.destinations) ? body.destinations : ['UAE'],
    travelStyle: body.travelStyle || 'Luxury',
    travelDates: body.travelDates || 'Flexible',
    guests: body.guests || '2 Adults',
    notes: body.notes || '',
    locale: body.locale === 'ar' ? 'ar' : 'en',
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  store.enquiries.unshift(created);
  saveCmsStore(store);
  return Response.json({ enquiry: created }, { status: 201 });
}
