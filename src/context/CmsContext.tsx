'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { INITIAL_ENQUIRIES, INITIAL_SITEMAP_PAGES } from '@/data/sitemapSeed';
import type { EnquiryRecord, EnquiryStatus, SitemapPage } from '@/types/cms';

interface CmsContextValue {
  pages: SitemapPage[];
  enquiries: EnquiryRecord[];
  loading: boolean;
  error: string | null;
  refreshCms: () => Promise<void>;
  updatePage: (nodeId: string, patch: Partial<SitemapPage>) => Promise<SitemapPage>;
  createPage: (newPage: Partial<SitemapPage>) => Promise<SitemapPage>;
  deletePage: (nodeId: string) => Promise<void>;
  resetCms: () => Promise<void>;
  submitEnquiry: (payload: Omit<EnquiryRecord, 'id' | 'status' | 'createdAt'>) => Promise<EnquiryRecord>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => Promise<void>;
  findPageByUrl: (pathname: string) => { page: SitemapPage | undefined; locale: 'en' | 'ar'; cleanPath: string };
}

const CmsContext = createContext<CmsContextValue | null>(null);

export function normalizeRoutePath(pathname: string): { locale: 'en' | 'ar'; cleanPath: string } {
  const trimmed = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  if (trimmed === '/ar' || trimmed.startsWith('/ar/')) {
    const stripped = trimmed.slice(3) || '/';
    return { locale: 'ar', cleanPath: stripped };
  }
  return { locale: 'en', cleanPath: trimmed };
}

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = useState<SitemapPage[]>(INITIAL_SITEMAP_PAGES);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(INITIAL_ENQUIRIES);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCms = useCallback(async () => {
    try {
      setError(null);
      const [pagesRes, enqRes] = await Promise.all([
        fetch('/api/pages'),
        fetch('/api/enquiries'),
      ]);
      if (pagesRes.ok) {
        const data = (await pagesRes.json()) as { pages: SitemapPage[] };
        if (Array.isArray(data.pages) && data.pages.length > 0) {
          setPages(data.pages);
        }
      }
      if (enqRes.ok) {
        const data = (await enqRes.json()) as { enquiries: EnquiryRecord[] };
        if (Array.isArray(data.enquiries)) {
          setEnquiries(data.enquiries);
        }
      }
    } catch {
      // Fallback safely to seed data if offline
      setError('Using local workspace seed data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(refreshCms);
  }, [refreshCms]);

  const updatePage = useCallback(async (nodeId: string, patch: Partial<SitemapPage>) => {
    const res = await fetch(`/api/pages/${encodeURIComponent(nodeId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      const errData = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(errData.error || 'Failed to save page changes');
    }
    const { page } = (await res.json()) as { page: SitemapPage };
    setPages((prev) => prev.map((p) => (p.nodeId === nodeId ? page : p)));
    return page;
  }, []);

  const createPage = useCallback(async (newPage: Partial<SitemapPage>) => {
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPage),
    });
    if (!res.ok) {
      const errData = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(errData.error || 'Failed to create page');
    }
    const { page } = (await res.json()) as { page: SitemapPage };
    setPages((prev) => [...prev, page]);
    return page;
  }, []);

  const deletePage = useCallback(async (nodeId: string) => {
    const res = await fetch(`/api/pages/${encodeURIComponent(nodeId)}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errData = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(errData.error || 'Failed to delete page');
    }
    setPages((prev) => prev.filter((p) => p.nodeId !== nodeId));
  }, []);

  const resetCms = useCallback(async () => {
    const res = await fetch('/api/pages/reset', { method: 'POST' });
    if (res.ok) {
      const data = (await res.json()) as { pages: SitemapPage[]; enquiries: EnquiryRecord[] };
      setPages(data.pages);
      setEnquiries(data.enquiries);
    }
  }, []);

  const submitEnquiry = useCallback(
    async (payload: Omit<EnquiryRecord, 'id' | 'status' | 'createdAt'>) => {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error('Could not submit enquiry');
      }
      const { enquiry } = (await res.json()) as { enquiry: EnquiryRecord };
      setEnquiries((prev) => [enquiry, ...prev]);
      return enquiry;
    },
    []
  );

  const updateEnquiryStatus = useCallback(async (id: string, status: EnquiryStatus) => {
    const res = await fetch(`/api/enquiries/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const { enquiry } = (await res.json()) as { enquiry: EnquiryRecord };
      setEnquiries((prev) => prev.map((e) => (e.id === id ? enquiry : e)));
    }
  }, []);

  const findPageByUrl = useCallback(
    (pathname: string) => {
      const { locale, cleanPath } = normalizeRoutePath(pathname);
      const match = pages.find(
        (p) => p.url === cleanPath || p.secondaryUrl === cleanPath
      );
      return { page: match, locale, cleanPath };
    },
    [pages]
  );

  return (
    <CmsContext.Provider
      value={{
        pages,
        enquiries,
        loading,
        error,
        refreshCms,
        updatePage,
        createPage,
        deletePage,
        resetCms,
        submitEnquiry,
        updateEnquiryStatus,
        findPageByUrl,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms must be used within CmsProvider');
  }
  return ctx;
}
