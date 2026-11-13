'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExternalLink, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { useCms } from '@/context/CmsContext';
import type { LaunchPhase, MediaKey, PublishStatus } from '@/types/cms';

export function AdminPagesListPage() {
  const { pages, createPage, deletePage, updatePage } = useCms();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParams = (next: Record<string, string>) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    router.replace(query ? `/admin/pages?${query}` : '/admin/pages', { scroll: false });
  };

  const initialSection = searchParams?.get('section') || 'All';
  const showCreateModal = searchParams?.get('create') === '1';

  const [sectionFilter, setSectionFilter] = useState(initialSection);
  const [phaseFilter, setPhaseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [query, setQuery] = useState('');

  // New Page Form State
  const [newName, setNewName] = useState('');
  const [newNameAr, setNewNameAr] = useState('');
  const [newUrl, setNewUrl] = useState('/destinations/');
  const [newSection, setNewSection] = useState('Discover the Gulf');
  const [newParentId, setNewParentId] = useState('DEST');
  const [newPhase, setNewPhase] = useState<LaunchPhase>('P1');
  const [newMedia, setNewMedia] = useState<MediaKey>('hero-gulf');
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const sections = useMemo(
    () => ['All', ...Array.from(new Set(pages.map((p) => p.section)))],
    [pages]
  );

  const filtered = useMemo(() => {
    return pages.filter((p) => {
      if (sectionFilter !== 'All' && p.section !== sectionFilter) return false;
      if (phaseFilter !== 'All' && p.launchPhase !== phaseFilter) return false;
      if (statusFilter !== 'All' && p.status !== statusFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          p.pageName.toLowerCase().includes(q) ||
          p.pageNameAr.toLowerCase().includes(q) ||
          p.url.toLowerCase().includes(q) ||
          p.nodeId.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [pages, sectionFilter, phaseFilter, statusFilter, query]);

  const handleQuickStatus = async (nodeId: string, status: PublishStatus) => {
    await updatePage(nodeId, { status });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    if (!newName.trim() || !newUrl.trim()) {
      setCreateError('Page Name and URL are required.');
      return;
    }
    setCreating(true);
    try {
      const created = await createPage({
        pageName: newName.trim(),
        pageNameAr: newNameAr.trim() || newName.trim(),
        url: newUrl.trim(),
        section: newSection,
        parentNodeId: newParentId,
        launchPhase: newPhase,
        mediaKey: newMedia,
        status: 'Published',
      });
      router.push(`/admin/pages/${created.nodeId}`);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create page');
    } finally {
      setCreating(false);
    }
  };

  return (
    <AdminLayout
      title="Pages & Route Registry"
      breadcrumb={['AB Tours Admin', 'Pages & Routes']}
      actions={
        <button
          type="button"
          onClick={() => updateSearchParams({ create: '1' })}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1F7A4D] rounded-lg hover:bg-[#18603C] whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Page</span>
        </button>
      }
    >
      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by title, URL, Node ID..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F2744]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white"
          >
            {sections.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Sections' : s}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Draft">Draft</option>
          </select>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {['All', 'P1', 'P2', 'P3'].map((ph) => (
              <button
                key={ph}
                type="button"
                onClick={() => setPhaseFilter(ph)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  phaseFilter === ph
                    ? 'bg-white text-[#0F2744] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ph}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 bg-white border border-slate-200 rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Node</th>
              <th className="py-3 px-4">Page Title (EN / AR)</th>
              <th className="py-3 px-4">Section</th>
              <th className="py-3 px-4">Route URL</th>
              <th className="py-3 px-4">Phase</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-sm text-slate-500">
                  No sitemap pages match your current filters.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.nodeId} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 text-xs font-mono text-slate-400 tabular-nums">
                    {p.rowNumber}
                  </td>
                  <td className="py-2.5 px-4 text-xs font-mono font-semibold text-[#0F2744]">
                    {p.nodeId}
                  </td>
                  <td className="py-2.5 px-4">
                    <Link
                      href={`/admin/pages/${p.nodeId}`}
                      className="font-semibold text-slate-900 hover:text-[#0F2744] hover:underline block"
                    >
                      {p.pageName}
                    </Link>
                    <span className="text-xs text-slate-500">{p.pageNameAr}</span>
                  </td>
                  <td className="py-2.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                    {p.section}
                  </td>
                  <td className="py-2.5 px-4 text-xs font-mono text-slate-600">
                    {p.externalUrl ? p.externalUrl : p.url}
                  </td>
                  <td className="py-2.5 px-4 text-xs font-mono text-slate-600">
                    {p.launchPhase || 'EXT'}
                  </td>
                  <td className="py-2.5 px-4">
                    <select
                      value={p.status}
                      onChange={(e) => void handleQuickStatus(p.nodeId, e.target.value as PublishStatus)}
                      className={`text-xs font-medium px-2 py-1 rounded border border-slate-200 bg-white ${
                        p.status === 'Published'
                          ? 'text-[#1F7A4D]'
                          : p.status === 'Scheduled'
                          ? 'text-amber-700'
                          : 'text-slate-600'
                      }`}
                    >
                      <option value="Published">Published</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/pages/${p.nodeId}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#0F2744] border border-slate-200 rounded-md hover:bg-slate-50"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>Edit</span>
                      </Link>
                      {!p.externalUrl && (
                        <Link
                          href={p.url}
                          className="p-1.5 text-slate-500 hover:text-[#0F2744]"
                          title="Open live page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      {p.rowNumber > 66 && (
                        <button
                          type="button"
                          onClick={() => void deletePage(p.nodeId)}
                          className="p-1.5 text-red-600 hover:text-red-700"
                          title="Delete custom page"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Page Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h2 className="font-display text-lg font-bold text-[#0F2744]">
                Add New Sitemap Page
              </h2>
              <button
                type="button"
                onClick={() => updateSearchParams({})}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              {createError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                  {createError}
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Page Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Jeddah Historic Al-Balad"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Page Name (Arabic)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={newNameAr}
                  onChange={(e) => setNewNameAr(e.target.value)}
                  placeholder="مثال: جدة التاريخية — البلد"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Section *
                  </label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    {sections
                      .filter((s) => s !== 'All' && s !== 'Home')
                      .map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Parent Node
                  </label>
                  <select
                    value={newParentId}
                    onChange={(e) => setNewParentId(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    {pages
                      .filter((p) => p.level <= 2)
                      .map((p) => (
                        <option key={p.nodeId} value={p.nodeId}>
                          {p.pageName} ({p.nodeId})
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  URL Path *
                </label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="/destinations/saudi-arabia/jeddah"
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Launch Phase
                  </label>
                  <select
                    value={newPhase}
                    onChange={(e) => setNewPhase(e.target.value as LaunchPhase)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="P1">P1 (Launch)</option>
                    <option value="P2">P2 (~2 Months)</option>
                    <option value="P3">P3 (Scale-up)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Featured Image
                  </label>
                  <select
                    value={newMedia}
                    onChange={(e) => setNewMedia(e.target.value as MediaKey)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="hero-gulf">Gulf Desert &amp; Pavilion</option>
                    <option value="dubai-skyline">Dubai Waterfront</option>
                    <option value="alula-hegra">AlUla Hegra Sandstone</option>
                    <option value="doha-bay">Doha Corniche &amp; Dhow</option>
                    <option value="executive-fleet">Executive Fleet</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => updateSearchParams({})}
                  className="px-4 py-2 text-xs font-medium border border-slate-300 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1F7A4D] rounded-lg hover:bg-[#18603C]"
                >
                  {creating ? 'Creating...' : 'Create & Edit Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
