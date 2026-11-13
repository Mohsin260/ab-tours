'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { SECTION_DEFINITIONS } from '@/data/sitemapSeed';
import { useCms } from '@/context/CmsContext';

export function AdminDashboardPage() {
  const { pages, enquiries, resetCms } = useCms();

  const metrics = useMemo(() => {
    const p1 = pages.filter((p) => p.launchPhase === 'P1').length;
    const p2 = pages.filter((p) => p.launchPhase === 'P2').length;
    const p3 = pages.filter((p) => p.launchPhase === 'P3').length;
    const published = pages.filter((p) => p.status === 'Published').length;
    const sister = pages.filter((p) => p.pageType === 'Sister brand (external)').length;
    return { p1, p2, p3, published, sister };
  }, [pages]);

  const sectionBreakdown = useMemo(() => {
    const map = new Map<string, { total: number; p1: number; p2: number; p3: number; published: number }>();
    for (const p of pages) {
      const current = map.get(p.section) || { total: 0, p1: 0, p2: 0, p3: 0, published: 0 };
      current.total += 1;
      if (p.launchPhase === 'P1') current.p1 += 1;
      if (p.launchPhase === 'P2') current.p2 += 1;
      if (p.launchPhase === 'P3') current.p3 += 1;
      if (p.status === 'Published') current.published += 1;
      map.set(p.section, current);
    }
    return Array.from(map.entries());
  }, [pages]);

  return (
    <AdminLayout
      title="Sitemap & Content Overview"
      breadcrumb={['AB Tours Admin', 'Overview']}
      actions={
        <>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset CMS pages and enquiries back to default 66-page seed?')) {
                void resetCms();
              }
            }}
            className="px-3 py-2 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 whitespace-nowrap"
          >
            Reset to Seed
          </button>
          <Link
            href="/admin/pages?create=1"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1F7A4D] rounded-lg hover:bg-[#18603C] whitespace-nowrap"
          >
            + New Page
          </Link>
        </>
      }
    >
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Total Sitemap Nodes</p>
          <p className="mt-1 font-display text-2xl font-bold text-[#0F2744] tabular-nums">{pages.length}</p>
          <p className="mt-1 text-xs text-slate-500">EN + /ar bilingual mirror</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Published Pages</p>
          <p className="mt-1 font-display text-2xl font-bold text-[#1F7A4D] tabular-nums">{metrics.published}</p>
          <p className="mt-1 text-xs text-slate-500">Live on public routes</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Phase Breakdown</p>
          <p className="mt-1 font-display text-lg font-bold text-[#0F2744] tabular-nums">
            P1: {metrics.p1} · P2: {metrics.p2} · P3: {metrics.p3}
          </p>
          <p className="mt-1 text-xs text-slate-500">{metrics.sister} sister brand links</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Website Sections</p>
          <p className="mt-1 font-display text-2xl font-bold text-[#0F2744] tabular-nums">
            {SECTION_DEFINITIONS.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">Mapped to Section Names sheet</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Trip &amp; B2B Enquiries</p>
          <p className="mt-1 font-display text-2xl font-bold text-[#0F2744] tabular-nums">{enquiries.length}</p>
          <Link href="/admin/enquiries" className="mt-1 inline-block text-xs font-medium text-[#1F7A4D] hover:underline">
            Open inbox →
          </Link>
        </div>
      </div>

      {/* Section Summary Matrix (Matching Sheet: Summary) */}
      <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-[#0F2744]">
              Section Rollout Matrix
            </h2>
            <p className="text-xs text-slate-500">
              Page distribution across P1 (launch), P2 (~2 months), and P3 (scale-up / OTA).
            </p>
          </div>
          <Link href="/admin/pages" className="text-xs font-medium text-[#0F2744] hover:underline">
            Manage all pages →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <th className="py-3 px-6">Section</th>
                <th className="py-3 px-4 text-right">Total Nodes</th>
                <th className="py-3 px-4 text-right">P1 (Launch)</th>
                <th className="py-3 px-4 text-right">P2 (~2 Months)</th>
                <th className="py-3 px-4 text-right">P3 (Scale-up)</th>
                <th className="py-3 px-4 text-right">Published</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sectionBreakdown.map(([section, stats]) => (
                <tr key={section} className="hover:bg-slate-50/70">
                  <td className="py-3 px-6 font-medium text-slate-900">{section}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">{stats.total}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-[#1F7A4D]">{stats.p1}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-amber-700">{stats.p2}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600">{stats.p3}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">{stats.published}</td>
                  <td className="py-3 px-6 text-right">
                    <Link
                      href={`/admin/pages?section=${encodeURIComponent(section)}`}
                      className="text-xs font-medium text-[#0F2744] hover:underline"
                    >
                      Filter pages
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Enquiries Preview */}
      <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base font-bold text-[#0F2744]">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="text-xs font-medium text-[#0F2744] hover:underline inline-flex items-center gap-1">
            <span>View all enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {enquiries.slice(0, 4).map((enq) => (
            <div key={enq.id} className="py-3 flex flex-wrap items-center justify-between gap-4 text-sm">
              <div>
                <span className="font-mono text-xs text-slate-500 mr-2">{enq.id}</span>
                <span className="font-semibold text-slate-900">{enq.name}</span>
                <span className="text-slate-500 text-xs ml-2">
                  {enq.originCountry} · {enq.destinations.join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-slate-600">{enq.type}</span>
                <span className="font-medium text-[#0F2744]">{enq.status}</span>
                <Link href="/admin/pages/PLAN" className="text-slate-400 hover:text-[#0F2744]" title="Open Plan My Trip page">
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
