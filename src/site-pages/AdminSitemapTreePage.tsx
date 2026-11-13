'use client';

import React from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/AdminLayout';
import { useCms } from '@/context/CmsContext';
import type { SitemapPage } from '@/types/cms';

export function AdminSitemapTreePage() {
  const { pages } = useCms();

  const renderNode = (node: SitemapPage, depth: number) => {
    const children = pages.filter((p) => p.parentNodeId === node.nodeId);
    const isSister = node.pageType === 'Sister brand (external)';
    const isCta = node.pageType === 'Conversion page';
    const isSection = node.pageType === 'Section (menu item)';

    return (
      <div key={node.nodeId} className={depth > 0 ? 'ml-6 pl-4 border-l border-slate-200 mt-2' : 'mt-4'}>
        <div
          className={`flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-lg border text-sm ${
            node.nodeId === 'HOME'
              ? 'bg-[#0F2744] text-white border-[#0F2744]'
              : isSection
              ? 'bg-[#EAF2FA] text-[#0F2744] border-[#B6CEE6]'
              : isCta
              ? 'bg-[#1F7A4D] text-white border-[#1F7A4D]'
              : isSister
              ? 'bg-[#FDE9C8] text-[#1F2328] border-[#E0B15A]'
              : 'bg-white text-slate-900 border-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2.5 min-w-0">
            <span className="text-[11px] font-mono opacity-80">{node.nodeId}</span>
            <span className="font-semibold">{node.pageName}</span>
            <span className="text-xs font-mono opacity-75">
              {node.externalUrl ? node.externalUrl : node.url}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs shrink-0">
            {node.launchPhase && <span className="font-mono opacity-80">{node.launchPhase}</span>}
            <Link
              href={`/admin/pages/${node.nodeId}`}
              className={`font-medium underline underline-offset-2 ${
                node.nodeId === 'HOME' || isCta ? 'text-white' : 'text-[#0F2744]'
              }`}
            >
              Edit
            </Link>
          </div>
        </div>
        {children.length > 0 && (
          <div>{children.map((child) => renderNode(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  const homeNode = pages.find((p) => p.nodeId === 'HOME');

  return (
    <AdminLayout
      title="Visual Sitemap Hierarchy"
      breadcrumb={['AB Tours Admin', 'Sitemap Tree']}
      actions={
        <Link
          href="/admin/pages"
          className="px-3 py-2 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50"
        >
          Manage Pages Registry
        </Link>
      }
    >
      {/* Legend matching HTML flowchart */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center gap-6 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#0F2744] inline-block" />
          <span>Home</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#EAF2FA] border border-[#B6CEE6] inline-block" />
          <span>Section (menu item)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-white border border-slate-300 inline-block" />
          <span>Child Page</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#FDE9C8] border border-[#E0B15A] inline-block" />
          <span>Sister brand link</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#1F7A4D] inline-block" />
          <span>Conversion page (/plan-my-trip)</span>
        </div>
      </div>

      <div className="mt-4">{homeNode && renderNode(homeNode, 0)}</div>
    </AdminLayout>
  );
}
