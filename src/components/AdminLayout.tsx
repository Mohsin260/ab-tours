import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ExternalLink,
  FileText,
  FolderTree,
  Inbox,
  LayoutDashboard,
  Plus,
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';

interface AdminLayoutProps {
  title: string;
  breadcrumb: string[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminLayout({ title, breadcrumb, actions, children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { pages, enquiries } = useCms();

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const navItems = [
    { label: 'Overview', to: '/admin', icon: LayoutDashboard, exact: true },
    { label: `Pages & Routes (${pages.length})`, to: '/admin/pages', icon: FileText, exact: false },
    { label: 'Sitemap Tree', to: '/admin/sitemap', icon: FolderTree, exact: true },
    {
      label: `Enquiries${newEnquiriesCount > 0 ? ` (${newEnquiriesCount} new)` : ''}`,
      to: '/admin/enquiries',
      icon: Inbox,
      exact: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-slate-900 flex flex-col lg:flex-row">
      {/* Sidebar (256px) */}
      <aside className="w-full lg:w-64 bg-[#0F2744] text-slate-200 shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
        <div>
          <div className="px-6 h-16 flex items-center justify-between border-b border-white/10">
            <Link href="/admin" className="font-display text-lg font-bold text-white whitespace-nowrap">
              AB Tours CMS
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.exact
                ? pathname === item.to
                : (pathname ?? '').startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-2 text-xs">
          <Link
            href="/admin/pages?create=1"
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1F7A4D] text-white font-medium hover:bg-[#18603C] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Sitemap Page</span>
          </Link>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/20 text-slate-200 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Breadcrumb Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">{breadcrumb.join(' / ')}</p>
            <h1 className="font-display text-lg font-bold text-[#0F2744] truncate">{title}</h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">{actions}</div>
        </header>

        <main className="flex-1 p-6 max-w-[1440px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
