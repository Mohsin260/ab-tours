'use client';

import React, { useMemo, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { useCms } from '@/context/CmsContext';
import type { EnquiryStatus } from '@/types/cms';

export function AdminEnquiriesPage() {
  const { enquiries, updateEnquiryStatus } = useCms();
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = useMemo(() => {
    if (typeFilter === 'All') return enquiries;
    return enquiries.filter((e) => e.type === typeFilter);
  }, [enquiries, typeFilter]);

  return (
    <AdminLayout
      title="Trip & B2B Enquiries Inbox"
      breadcrumb={['AB Tours Admin', 'Enquiries']}
    >
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {[
            { value: 'All', label: 'All Enquiries' },
            { value: 'trip', label: 'Plan My Trip' },
            { value: 'b2b-partner', label: 'B2B Partners' },
            { value: 'b2b-rates', label: 'Rate Requests' },
            { value: 'contact', label: 'Contact' },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setTypeFilter(tab.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                typeFilter === tab.value
                  ? 'bg-white text-[#0F2744] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-500 tabular-nums">
          {filtered.length} records
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-500">
            No enquiries match this filter yet. Submissions from /plan-my-trip and /travel-agents appear here immediately.
          </div>
        ) : (
          filtered.map((enq) => (
            <div key={enq.id} className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-semibold text-[#0F2744]">{enq.id}</span>
                    <span>·</span>
                    <span className="font-mono">{enq.type}</span>
                    <span>·</span>
                    <span>{enq.locale.toUpperCase()}</span>
                    <span>·</span>
                    <span className="font-mono">{enq.createdAt.slice(0, 10)}</span>
                  </div>
                  <h2 className="mt-1 font-display text-lg font-bold text-[#0F2744]">
                    {enq.name}
                    {enq.company ? ` — ${enq.company}` : ''}
                  </h2>
                  <p className="text-xs text-slate-600">
                    {enq.email} {enq.phone ? `· ${enq.phone}` : ''}
                  </p>
                </div>

                <div>
                  <label className="sr-only">Enquiry status</label>
                  <select
                    value={enq.status}
                    onChange={(e) =>
                      void updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)
                    }
                    className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-white text-[#0F2744]"
                  >
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <p className="text-slate-500">Travelling From</p>
                  <p className="mt-0.5 font-medium text-slate-900">{enq.originCountry}</p>
                </div>
                <div>
                  <p className="text-slate-500">Destinations</p>
                  <p className="mt-0.5 font-medium text-slate-900">{enq.destinations.join(', ')}</p>
                </div>
                <div>
                  <p className="text-slate-500">Style &amp; Guests</p>
                  <p className="mt-0.5 font-medium text-slate-900">
                    {enq.travelStyle} · {enq.guests}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Dates</p>
                  <p className="mt-0.5 font-medium text-slate-900">{enq.travelDates}</p>
                </div>
              </div>

              {enq.notes && (
                <p className="mt-4 pt-3 border-t border-slate-100 text-sm text-slate-700">
                  {enq.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
