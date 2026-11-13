import { loadCmsStore, saveCmsStore } from '@/lib/cmsStore';
import type { SitemapPage } from '@/types/cms';

export function GET() {
  return Response.json({ pages: loadCmsStore().pages });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<SitemapPage>;
  if (!body.pageName || !body.url || !body.section) {
    return Response.json(
      { error: 'pageName, url, and section are required' },
      { status: 400 },
    );
  }

  const store = loadCmsStore();
  const normalizedUrl = body.url.startsWith('/') ? body.url : `/${body.url}`;
  const nodeId = body.nodeId?.trim().toUpperCase() || `PG${Date.now().toString().slice(-4)}`;

  if (store.pages.some((page) => page.nodeId === nodeId || page.url === normalizedUrl)) {
    return Response.json(
      { error: 'A page with that Node ID or URL already exists' },
      { status: 409 },
    );
  }

  const parent = store.pages.find((page) => page.nodeId === body.parentNodeId);
  const nextRowNumber = store.pages.reduce((max, page) => Math.max(max, page.rowNumber), 0) + 1;
  const created: SitemapPage = {
    rowNumber: nextRowNumber,
    nodeId,
    parentNodeId: parent?.nodeId || body.parentNodeId || 'HOME',
    level: parent ? parent.level + 1 : body.level ?? 2,
    section: body.section,
    pageName: body.pageName,
    pageNameAr: body.pageNameAr || body.pageName,
    url: normalizedUrl,
    arabicUrl: normalizedUrl === '/' ? '/ar' : `/ar${normalizedUrl}`,
    parentPage: parent?.pageName || body.parentPage || 'AB Tours Home',
    pageType: body.pageType || 'Page',
    linkType: 'Child page',
    launchPhase: body.launchPhase ?? 'P1',
    notes: body.notes || '',
    status: body.status || 'Published',
    mediaKey: body.mediaKey || 'hero-gulf',
    updatedAt: new Date().toISOString().slice(0, 10),
    content: {
      headlineEn: body.content?.headlineEn || body.pageName,
      headlineAr: body.content?.headlineAr || body.pageNameAr || body.pageName,
      subheadlineEn: body.content?.subheadlineEn || `${body.section} — AB Tours Gulf DMC`,
      subheadlineAr: body.content?.subheadlineAr || body.pageNameAr || body.pageName,
      bodyEn:
        body.content?.bodyEn ||
        `${body.pageName} managed by AB Tours operations across Dubai, Riyadh, and Doha.`,
      bodyAr:
        body.content?.bodyAr ||
        `${body.pageNameAr || body.pageName} بإدارة فرق عمليات AB Tours في الخليج.`,
      highlightsEn: body.content?.highlightsEn || [
        'Licensed Gulf ground operations',
        'Direct hotel contracting and VIP transfers',
      ],
      highlightsAr: body.content?.highlightsAr || [
        'عمليات أرضية مرخصة في الخليج',
        'تعاقدات فندقية مباشرة وتنقلات خاصة',
      ],
      duration: body.content?.duration,
      startingPrice: body.content?.startingPrice,
      regionHub: body.content?.regionHub || 'Dubai · Riyadh · Doha',
      ctaLabelEn: 'Plan My Trip',
      ctaLabelAr: 'خطط رحلتك الآن',
      ctaTarget: '/plan-my-trip',
      seoTitle: `${body.pageName} | AB Tours`,
      seoDescription: `${body.pageName} — ${body.section} by AB Tours.`,
    },
  };

  store.pages.push(created);
  saveCmsStore(store);
  return Response.json({ page: created }, { status: 201 });
}
