'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ResilientImage } from '@/components/ResilientImage';
import { useCms } from '@/context/CmsContext';
import type { ItineraryDay, LaunchPhase, MediaKey, PublishStatus } from '@/types/cms';

export function AdminPageEditorPage({ nodeId }: { nodeId: string }) {
  const { pages, updatePage } = useCms();
  const page = pages.find((p) => p.nodeId === nodeId);

  const [activeLocaleTab, setActiveLocaleTab] = useState<'en' | 'ar'>('en');
  const [pageName, setPageName] = useState('');
  const [pageNameAr, setPageNameAr] = useState('');
  const [status, setStatus] = useState<PublishStatus>('Published');
  const [launchPhase, setLaunchPhase] = useState<LaunchPhase>('P1');
  const [mediaKey, setMediaKey] = useState<MediaKey>('hero-gulf');
  const [headlineEn, setHeadlineEn] = useState('');
  const [headlineAr, setHeadlineAr] = useState('');
  const [subheadlineEn, setSubheadlineEn] = useState('');
  const [subheadlineAr, setSubheadlineAr] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [bodyAr, setBodyAr] = useState('');
  const [highlightsTextEn, setHighlightsTextEn] = useState('');
  const [highlightsTextAr, setHighlightsTextAr] = useState('');
  const [duration, setDuration] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [regionHub, setRegionHub] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!page) return;
    // Reset the editable fields after the selected page loads from the CMS.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageName(page.pageName);
    setPageNameAr(page.pageNameAr);
    setStatus(page.status);
    setLaunchPhase(page.launchPhase);
    setMediaKey(page.mediaKey);
    setHeadlineEn(page.content.headlineEn);
    setHeadlineAr(page.content.headlineAr);
    setSubheadlineEn(page.content.subheadlineEn);
    setSubheadlineAr(page.content.subheadlineAr);
    setBodyEn(page.content.bodyEn);
    setBodyAr(page.content.bodyAr);
    setHighlightsTextEn(page.content.highlightsEn.join('\n'));
    setHighlightsTextAr(page.content.highlightsAr.join('\n'));
    setDuration(page.content.duration || '');
    setStartingPrice(page.content.startingPrice || '');
    setRegionHub(page.content.regionHub || '');
    setSeoTitle(page.content.seoTitle);
    setSeoDescription(page.content.seoDescription);
    setNotes(page.notes);
    setItinerary(page.content.itinerary || []);
  }, [page]);

  if (!page) {
    return (
      <AdminLayout title="Page Not Found" breadcrumb={['AB Tours Admin', 'Pages', nodeId || '']}>
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <p className="text-sm text-slate-600">No sitemap node found with ID &ldquo;{nodeId}&rdquo;.</p>
          <Link href="/admin/pages" className="mt-4 inline-block text-sm font-medium text-[#0F2744] hover:underline">
            Return to Pages Registry →
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    setSavedNotice(false);
    try {
      await updatePage(page.nodeId, {
        pageName,
        pageNameAr,
        status,
        launchPhase,
        mediaKey,
        notes,
        content: {
          ...page.content,
          headlineEn,
          headlineAr,
          subheadlineEn,
          subheadlineAr,
          bodyEn,
          bodyAr,
          highlightsEn: highlightsTextEn
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          highlightsAr: highlightsTextAr
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          duration: duration.trim() || undefined,
          startingPrice: startingPrice.trim() || undefined,
          regionHub: regionHub.trim() || undefined,
          seoTitle,
          seoDescription,
          itinerary: itinerary.length > 0 ? itinerary : undefined,
        },
      });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title={`Edit: ${page.pageName}`}
      breadcrumb={['AB Tours Admin', 'Pages', page.section, page.nodeId]}
      actions={
        <div className="flex items-center gap-2">
          {!page.externalUrl && (
            <>
              <Link
                href={page.url}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 whitespace-nowrap"
              >
                <span>Live EN</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href={page.arabicUrl}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 whitespace-nowrap"
              >
                <span>Live AR</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </>
          )}
        </div>
      }
    >
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Editor */}
        <div className="lg:col-span-8 space-y-6">
          {saveError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {saveError}
            </div>
          )}
          {savedNotice && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Changes saved and published live to {page.url} and {page.arabicUrl}.</span>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="font-display text-base font-bold text-[#0F2744]">Bilingual Page Content</h2>
                <p className="text-xs text-slate-500 font-mono">
                  EN: {page.url} · AR: {page.arabicUrl}
                </p>
              </div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveLocaleTab('en')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                    activeLocaleTab === 'en' ? 'bg-white text-[#0F2744] shadow-sm' : 'text-slate-600'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLocaleTab('ar')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                    activeLocaleTab === 'ar' ? 'bg-white text-[#0F2744] shadow-sm' : 'text-slate-600'
                  }`}
                >
                  العربية (/ar)
                </button>
              </div>
            </div>

            {activeLocaleTab === 'en' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Navigation / Page Name (EN)</label>
                  <input
                    type="text"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Hero Headline (EN)</label>
                  <input
                    type="text"
                    value={headlineEn}
                    onChange={(e) => setHeadlineEn(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Subheadline (EN)</label>
                  <textarea
                    rows={2}
                    value={subheadlineEn}
                    onChange={(e) => setSubheadlineEn(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Body Overview (EN)</label>
                  <textarea
                    rows={4}
                    value={bodyEn}
                    onChange={(e) => setBodyEn(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Operational Highlights (1 per line, EN)
                  </label>
                  <textarea
                    rows={3}
                    value={highlightsTextEn}
                    onChange={(e) => setHighlightsTextEn(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4" dir="rtl">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">اسم الصفحة في القائمة (AR)</label>
                  <input
                    type="text"
                    value={pageNameAr}
                    onChange={(e) => setPageNameAr(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">العنوان الرئيسي (AR)</label>
                  <input
                    type="text"
                    value={headlineAr}
                    onChange={(e) => setHeadlineAr(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">العنوان الفرعي (AR)</label>
                  <textarea
                    rows={2}
                    value={subheadlineAr}
                    onChange={(e) => setSubheadlineAr(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">النص التفصيلي (AR)</label>
                  <textarea
                    rows={4}
                    value={bodyAr}
                    onChange={(e) => setBodyAr(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    أبرز المزايا (سطر لكل نقطة، AR)
                  </label>
                  <textarea
                    rows={3}
                    value={highlightsTextAr}
                    onChange={(e) => setHighlightsTextAr(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Itinerary Builder */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-base font-bold text-[#0F2744]">
                  Day-by-Day Itinerary (Packages &amp; Circuits)
                </h2>
                <p className="text-xs text-slate-500">Optional structured schedule displayed on tour package pages.</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setItinerary((prev) => [
                    ...prev,
                    { day: `Day 0${prev.length + 1}`, title: '', detail: '' },
                  ])
                }
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Day</span>
              </button>
            </div>

            {itinerary.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">No itinerary days configured for this page.</p>
            ) : (
              <div className="space-y-3">
                {itinerary.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.day}
                        onChange={(e) =>
                          setItinerary((prev) =>
                            prev.map((d, i) => (i === idx ? { ...d, day: e.target.value } : d))
                          )
                        }
                        className="w-24 px-2.5 py-1.5 text-xs font-mono border border-slate-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={item.title}
                        placeholder="Day title"
                        onChange={(e) =>
                          setItinerary((prev) =>
                            prev.map((d, i) => (i === idx ? { ...d, title: e.target.value } : d))
                          )
                        }
                        className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setItinerary((prev) => prev.filter((_, i) => i !== idx))}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={item.detail}
                      placeholder="Activity details..."
                      onChange={(e) =>
                        setItinerary((prev) =>
                          prev.map((d, i) => (i === idx ? { ...d, detail: e.target.value } : d))
                        )
                      }
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Publishing, Media & SEO */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-[#0F2744]">Publishing &amp; Sitemap Meta</h2>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PublishStatus)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Launch Phase</label>
              <select
                value={launchPhase}
                onChange={(e) => setLaunchPhase(e.target.value as LaunchPhase)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="P1">P1 (Launch)</option>
                <option value="P2">P2 (~2 Months)</option>
                <option value="P3">P3 (Scale-up / OTA)</option>
                <option value="">External / None</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Duration (Optional)</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 5 Days / 4 Nights"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Starting Rate (Optional)</label>
              <input
                type="text"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                placeholder="e.g. From USD 1,420 pp"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Operations Hub</label>
              <input
                type="text"
                value={regionHub}
                onChange={(e) => setRegionHub(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Sitemap Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#1F7A4D] rounded-lg hover:bg-[#18603C] disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save & Publish Changes'}
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-[#0F2744]">Featured Visual</h2>
            <ResilientImage mediaKey={mediaKey} aspectClass="aspect-[16/9]" className="rounded-lg" />
            <select
              value={mediaKey}
              onChange={(e) => setMediaKey(e.target.value as MediaKey)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
            >
              <option value="hero-gulf">Gulf Desert &amp; Pavilion</option>
              <option value="dubai-skyline">Dubai Waterfront Skyline</option>
              <option value="alula-hegra">AlUla Hegra Heritage</option>
              <option value="doha-bay">Doha Corniche &amp; Dhow</option>
              <option value="executive-fleet">AB Transport Executive Fleet</option>
            </select>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <h2 className="font-display text-base font-bold text-[#0F2744]">SEO Metadata</h2>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Meta Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
