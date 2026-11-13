import { loadCmsStore, saveCmsStore } from '@/lib/cmsStore';
import type { SitemapPage } from '@/types/cms';

interface PageRouteContext {
  params: Promise<{ nodeId: string }>;
}

export async function PUT(request: Request, context: PageRouteContext) {
  const { nodeId } = await context.params;
  const store = loadCmsStore();
  const index = store.pages.findIndex((page) => page.nodeId === nodeId);
  if (index === -1) {
    return Response.json({ error: 'Page not found' }, { status: 404 });
  }

  const incoming = (await request.json()) as Partial<SitemapPage>;
  const existing = store.pages[index];
  const updated: SitemapPage = {
    ...existing,
    ...incoming,
    nodeId: existing.nodeId,
    rowNumber: existing.rowNumber,
    updatedAt: new Date().toISOString().slice(0, 10),
    content: {
      ...existing.content,
      ...(incoming.content || {}),
    },
  };
  store.pages[index] = updated;
  saveCmsStore(store);
  return Response.json({ page: updated });
}

export async function DELETE(_request: Request, context: PageRouteContext) {
  const { nodeId } = await context.params;
  const store = loadCmsStore();
  const target = store.pages.find((page) => page.nodeId === nodeId);
  if (!target) {
    return Response.json({ error: 'Page not found' }, { status: 404 });
  }
  if (target.rowNumber <= 66) {
    return Response.json(
      {
        error:
          'Core sitemap architecture pages cannot be deleted; set status to Draft instead.',
      },
      { status: 400 },
    );
  }

  store.pages = store.pages.filter((page) => page.nodeId !== nodeId);
  saveCmsStore(store);
  return Response.json({ ok: true });
}
