import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { INITIAL_ENQUIRIES, INITIAL_SITEMAP_PAGES } from '@/data/sitemapSeed';
import type { EnquiryRecord, SitemapPage } from '@/types/cms';

export interface CmsStore {
  pages: SitemapPage[];
  enquiries: EnquiryRecord[];
}

const dataDirectory = path.join(process.cwd(), 'data');
const storePath = path.join(dataDirectory, 'cms-store.json');

export function createInitialStore(): CmsStore {
  return {
    pages: [...INITIAL_SITEMAP_PAGES],
    enquiries: [...INITIAL_ENQUIRIES],
  };
}

export function saveCmsStore(store: CmsStore): void {
  mkdirSync(dataDirectory, { recursive: true });
  writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf-8');
}

export function loadCmsStore(): CmsStore {
  if (existsSync(storePath)) {
    try {
      const parsed = JSON.parse(readFileSync(storePath, 'utf-8')) as Partial<CmsStore>;
      if (Array.isArray(parsed.pages) && parsed.pages.length > 0) {
        return {
          pages: parsed.pages,
          enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [...INITIAL_ENQUIRIES],
        };
      }
    } catch (error) {
      console.error('Failed to load CMS store; initializing defaults.', error);
    }
  }

  const initialStore = createInitialStore();
  saveCmsStore(initialStore);
  return initialStore;
}
