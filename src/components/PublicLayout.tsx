import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Globe,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import { AB_OFFICES, SECTION_DEFINITIONS } from '@/data/sitemapSeed';
import { normalizeRoutePath, useCms } from '@/context/CmsContext';
import type { SitemapPage } from '@/types/cms';

const MAIN_NAVIGATION_ITEMS = [
  {
    id: 'destinations',
    route: '/destinations',
    label: 'Discover the Gulf',
    labelAr: 'اكتشف الخليج',
  },
  {
    id: 'tour-packages',
    route: '/tour-packages',
    label: 'Tour Packages',
    labelAr: 'الباقات السياحية',
  },
  {
    id: 'corporate-events',
    route: '/corporate-events',
    label: 'Corporate & Events',
    labelAr: 'الشركات والفعاليات',
  },
  {
    id: 'visas',
    route: '/visas',
    label: 'Visas & Services',
    labelAr: 'التأشيرات والخدمات',
  },
  {
    id: 'travel-agents',
    route: '/travel-agents',
    label: 'For Travel Agents',
    labelAr: 'لوكلاء السفر',
  },
] as const;

interface NavigationSubpage {
  page: SitemapPage;
  depth: number;
}

function getNavigationSubpages(
  pages: SitemapPage[],
  parentNodeId: string
): NavigationSubpage[] {
  const subpages: NavigationSubpage[] = [];
  const visited = new Set([parentNodeId]);

  const visit = (nodeId: string, depth: number) => {
    pages
      .filter((page) => page.parentNodeId === nodeId)
      .sort((a, b) => a.rowNumber - b.rowNumber)
      .forEach((page) => {
        if (visited.has(page.nodeId)) return;
        visited.add(page.nodeId);

        if (page.url || page.secondaryUrl || page.externalUrl) {
          subpages.push({ page, depth });
        }
        visit(page.nodeId, depth + 1);
      });
  };

  visit(parentNodeId, 0);
  return subpages;
}

interface PublicLayoutProps {
  children: React.ReactNode;
  currentPage?: SitemapPage;
}

export function PublicLayout({ children, currentPage }: PublicLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { pages } = useCms();
  const { locale, cleanPath } = normalizeRoutePath(pathname ?? '/');
  const isAr = locale === 'ar';

  const [menuState, setMenuState] = useState({
    pathname: '',
    mobileMenuOpen: false,
    directoryOpen: false,
    navDropdownOpen: '',
    mobileSectionOpen: '',
  });
  const currentPath = pathname ?? '/';
  const mobileMenuOpen =
    menuState.pathname === currentPath && menuState.mobileMenuOpen;
  const directoryOpen =
    menuState.pathname === currentPath && menuState.directoryOpen;
  const navDropdownOpen =
    menuState.pathname === currentPath ? menuState.navDropdownOpen : '';
  const mobileSectionOpen =
    menuState.pathname === currentPath ? menuState.mobileSectionOpen : '';
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    return () => {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, [isAr]);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 0);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    // Resolve the current year at runtime so static prerendering remains deterministic.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentYear(new Date().getFullYear());
  }, []);

  const toLocalePath = (targetUrl: string) => {
    if (!targetUrl || targetUrl.startsWith('http')) return targetUrl;
    const normalized = targetUrl.startsWith('/') ? targetUrl : `/${targetUrl}`;
    if (!isAr) return normalized;
    return normalized === '/' ? '/ar' : `/ar${normalized}`;
  };

  const switchLocalePath = (nextLocale: 'en' | 'ar') => {
    if (nextLocale === 'ar') {
      return cleanPath === '/' ? '/ar' : `/ar${cleanPath}`;
    }
    return cleanPath;
  };

  const renderSubpageLinks = (
    subpages: NavigationSubpage[],
    className: string,
    onNavigate?: () => void
  ) => (
    <div className={className}>
      {subpages.map(({ page, depth }) => {
        const href = page.externalUrl || page.url || page.secondaryUrl || '';
        const label = isAr ? page.pageNameAr : page.pageName;
        const linkClassName =
          `block py-2 text-xs ${depth === 0 ? 'font-extrabold' : 'font-semibold'} normal-case tracking-normal text-[#0B1220] hover:text-[#0055AA] hover:bg-[#F6F4EF] rounded-md`;
        const style = { paddingInlineStart: `${12 + depth * 12}px`, paddingInlineEnd: '12px' };
        const content = <span>{label}</span>;

        return page.externalUrl ? (
          <a
            key={page.nodeId}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
            style={style}
            onClick={onNavigate}
          >
            {content}
            <ExternalLink className="ms-1 inline h-3 w-3" />
          </a>
        ) : (
          <Link
            key={page.nodeId}
            href={toLocalePath(href)}
            className={linkClassName}
            style={style}
            onClick={onNavigate}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );

  const breadcrumbs: SitemapPage[] = [];
  if (currentPage) {
    let cursor: SitemapPage | undefined = currentPage;
    const visited = new Set<string>();
    while (cursor && !visited.has(cursor.nodeId)) {
      visited.add(cursor.nodeId);
      breadcrumbs.unshift(cursor);
      cursor = cursor.parentNodeId
        ? pages.find((p) => p.nodeId === cursor?.parentNodeId)
        : undefined;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#0B1220]">
      {/* Strict 3-Zone Top Bar Contract with AB.Tours Signature Gold Accent Border */}
      <header
        className={`sticky top-0 z-40 bg-transparent backdrop-blur-md border-b-[3px] transition-colors ${
          isScrolled ? 'border-[#33D274]' : 'border-[#FFC107]'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
          {/* Zone 1: Single wordmark */}
          <Link
            href={toLocalePath('/')}
            className="font-anton text-2xl sm:text-[26px] tracking-[0.6px] whitespace-nowrap"
          >
            {/* AB<span className="text-[#FFC107]">.</span>
            <span className="text-[#0055AA]">Tours</span> */}
            <Image src="/roundLogo.png" alt="Logo" width={120} height={120} className="h-full w-30 object-contain" />
          </Link>

          {/* Zone 2: 5 clean visitor navigation links in AB.Tours Royal Blue */}
          <nav
            className={`hidden xl:flex items-center gap-7 text-[13px] font-extrabold uppercase tracking-[0.5px] transition-colors ${
              isScrolled ? 'text-[#FFC107]' : 'text-[#0055AA]'
            }`}
          >
            {MAIN_NAVIGATION_ITEMS.map((item) => {
              const sectionPage = pages.find((page) => page.url === item.route);
              const subpages = sectionPage
                ? getNavigationSubpages(pages, sectionPage.nodeId)
                : [];
              const isOpen = navDropdownOpen === item.id;

              return (
                <div
                  key={item.id}
                  className="relative flex items-center gap-1"
                  onMouseEnter={() =>
                    setMenuState({
                      pathname: currentPath,
                      mobileMenuOpen: false,
                      directoryOpen: false,
                      navDropdownOpen: item.id,
                      mobileSectionOpen: '',
                    })
                  }
                  onMouseLeave={() =>
                    setMenuState((previous) =>
                      previous.pathname === currentPath &&
                      previous.navDropdownOpen === item.id
                        ? { ...previous, navDropdownOpen: '' }
                        : previous
                    )
                  }
                >
                  {subpages.length > 0 && (
                    <>
                      <button
                        type="button"
                        aria-label={`${isAr ? 'عرض صفحات' : 'Show pages for'} ${isAr ? item.labelAr : item.label}`}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        aria-controls={`${item.id}-submenu`}
                        onClick={() =>
                          setMenuState({
                            pathname: currentPath,
                            mobileMenuOpen: false,
                            directoryOpen: false,
                            navDropdownOpen: item.id,
                            mobileSectionOpen: '',
                          })
                        }
                        className="inline-flex items-center gap-1 rounded hover:text-[#33D274] transition-colors whitespace-nowrap"
                      >
                        <span>{isAr ? item.labelAr : item.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div
                          id={`${item.id}-submenu`}
                          className="absolute start-0 top-full z-50 w-72 max-h-96 overflow-y-auto rounded-xl border border-[#E4E0D6] bg-white p-2 shadow-lg"
                        >
                          <Link
                            href={toLocalePath(item.route)}
                            className="block border-b border-[#E4E0D6] px-3 py-2.5 text-xs font-extrabold normal-case tracking-normal text-[#0055AA] hover:bg-[#F6F4EF] rounded-md"
                          >
                            {isAr ? `عرض جميع صفحات ${item.labelAr}` : `View all ${item.label}`}
                          </Link>
                          {renderSubpageLinks(subpages, '')}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary gold CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={toLocalePath('/plan-my-trip')}
              className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.4px] ${
                isScrolled ? 'text-[#2673F8]' : 'text-[#0B1220]'
              } hover:text-[#33D274] bg-[#FFC107] rounded-full hover:bg-[#FDFDFD] transition-colors whitespace-nowrap shrink-0`}
            >
              {isAr ? 'خطط رحلتك' : 'Plan My Trip'}
            </Link>
            <button
              type="button"
              onClick={() => setMenuState({
                pathname: currentPath,
                mobileMenuOpen: !mobileMenuOpen,
                directoryOpen: false,
                navDropdownOpen: '',
                mobileSectionOpen: '',
              })}
              aria-label="Toggle navigation menu"
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E4E0D6] text-[#0B1220] hover:bg-[#F6F4EF]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[#E4E0D6] bg-white px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm font-bold">
              {SECTION_DEFINITIONS.filter((section) => section.id !== 'plan-my-trip').map((section) => {
                const sectionPage = pages.find(
                  (page) =>
                    page.url === section.primaryRoute ||
                    page.secondaryUrl === section.primaryRoute
                );
                const subpages = sectionPage
                  ? getNavigationSubpages(pages, sectionPage.nodeId)
                  : [];
                const isOpen = mobileSectionOpen === section.id;

                return (
                  <div key={section.id} className="min-w-0">
                    <div className="flex items-center rounded-lg border border-[#E4E0D6]">
                      <Link
                        href={toLocalePath(section.primaryRoute)}
                        className="min-w-0 flex-1 py-2 px-3 text-[#0B1220] hover:bg-[#F6F4EF] hover:text-[#0055AA]"
                      >
                        {isAr ? section.menuLabelAr : section.menuLabel}
                      </Link>
                      {subpages.length > 0 && (
                        <button
                          type="button"
                          aria-label={`${isAr ? 'عرض صفحات' : 'Show pages for'} ${isAr ? section.menuLabelAr : section.menuLabel}`}
                          aria-expanded={isOpen}
                          aria-controls={`mobile-${section.id}-submenu`}
                          onClick={() =>
                            setMenuState({
                              pathname: currentPath,
                              mobileMenuOpen: true,
                              directoryOpen: false,
                              navDropdownOpen: '',
                              mobileSectionOpen: isOpen ? '' : section.id,
                            })
                          }
                          className="shrink-0 p-3 text-[#0B1220] hover:text-[#0055AA]"
                        >
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>
                    {isOpen && subpages.length > 0 && (
                      <div
                        id={`mobile-${section.id}-submenu`}
                        className="mt-1 max-h-60 overflow-y-auto rounded-lg bg-[#F6F4EF] p-1"
                      >
                        {renderSubpageLinks(subpages, '')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="pt-3 border-t border-[#E4E0D6] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => router.push(switchLocalePath(isAr ? 'en' : 'ar'))}
                className="px-3 py-2 text-xs font-bold border border-[#E4E0D6] rounded-lg text-[#0B1220] bg-[#F6F4EF]"
              >
                {isAr ? 'English (EN)' : 'العربية (AR)'}
              </button>
              <Link
                href={toLocalePath('/plan-my-trip')}
                className="px-5 py-2 text-xs font-extrabold uppercase text-[#0B1220] bg-[#FFC107] rounded-full"
              >
                {isAr ? 'خطط رحلتك' : 'Plan My Trip'}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Secondary Sandstone Utility Bar: Breadcrumbs, Section Explorer & EN/AR Switch */}
      <div className="bg-[#F6F4EF] border-b border-[#E4E0D6]">
        <div className="max-w-[1280px] mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#5B6373]">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            {breadcrumbs.length > 1 ? (
              breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.nodeId}>
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#5B6373] shrink-0" />}
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="font-bold text-[#0B1220] truncate max-w-[260px]">
                      {isAr ? crumb.pageNameAr : crumb.pageName}
                    </span>
                  ) : (
                    <Link
                      href={toLocalePath(crumb.url)}
                      className="font-medium text-[#0055AA] hover:underline whitespace-nowrap"
                    >
                      {isAr ? crumb.pageNameAr : crumb.pageName}
                    </Link>
                  )}
                </React.Fragment>
              ))
            ) : (
              <span className="font-bold text-[#0B1220]">
                {isAr
                  ? 'المملكة العربية السعودية · الإمارات · قطر · الهند'
                  : 'Saudi Arabia · United Arab Emirates · Qatar · Beyond'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setMenuState({
                pathname: currentPath,
                mobileMenuOpen: false,
                directoryOpen: !directoryOpen,
                navDropdownOpen: '',
                mobileSectionOpen: '',
              })}
              className="inline-flex items-center gap-1 font-bold text-[#0B1220] hover:text-[#0055AA] whitespace-nowrap cursor-pointer transition-colors"
            >
              <span>{isAr ? 'جميع الأقسام' : 'Explore Pages'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${directoryOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <span className="text-[#E4E0D6]" aria-hidden="true">|</span>
            <Link
              href={toLocalePath('/contact-us')}
              className="font-bold text-[#0B1220] hover:text-[#0055AA] whitespace-nowrap"
            >
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </Link>
            <span className="text-[#E4E0D6]" aria-hidden="true">|</span>
            <div className="flex items-center gap-1 bg-white border border-[#E4E0D6] rounded-md p-0.5">
              <button
                type="button"
                onClick={() => router.push(switchLocalePath('en'))}
                className={`px-2 py-0.5 rounded text-xs font-bold transition-colors whitespace-nowrap ${
                  !isAr ? 'bg-[#0B1220] text-[#FFC107]' : 'text-[#5B6373] hover:text-[#0B1220]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => router.push(switchLocalePath('ar'))}
                className={`px-2 py-0.5 rounded text-xs font-bold transition-colors whitespace-nowrap ${
                  isAr ? 'bg-[#0B1220] text-[#FFC107]' : 'text-[#5B6373] hover:text-[#0B1220]'
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>

        {/* Clean Visitor Mega-Menu for all sections (no URLs, no internal labels) */}
        {directoryOpen && (
          <div className="border-t border-[#E4E0D6] bg-white">
            <div className="max-w-[1280px] mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SECTION_DEFINITIONS.map((sec) => (
                <Link
                  key={sec.id}
                  href={toLocalePath(sec.primaryRoute)}
                  className="p-3.5 rounded-xl border border-[#E4E0D6] hover:border-[#FFC107] hover:bg-[#F6F4EF]/60 transition-colors block"
                >
                  <span className="block text-sm font-extrabold text-[#0B1220]">
                    {isAr ? sec.menuLabelAr : sec.menuLabel}
                  </span>
                  <p className="mt-1 text-xs text-[#5B6373] line-clamp-2">
                    {isAr ? sec.descriptionAr : sec.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* AB.Tours Deep Obsidian Footer */}
      <footer className="bg-[#080D18] text-[#9AA4BB]">
        <div className="max-w-[1280px] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link
              href={toLocalePath('/')}
              className="font-anton text-2xl tracking-[0.6px] uppercase text-white inline-block"
            >
              AB<span className="text-[#FFC107]">.</span>Tours
            </Link>
            <p className="mt-3 text-sm text-[#C7CEDE] leading-relaxed">
              {isAr
                ? 'نتجاوز الحدود والتوقعات. شريككم العالمي للسفر الفاخر وحلول الشركات وأسطول النقل الخاص في الخليج وخارجه.'
                : 'Beyond Boundaries, Beyond Expectations. Your global partner in curated Gulf travel, corporate solutions, and in-house executive transport.'}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-[#C7CEDE]">
              <Globe className="w-4 h-4 text-[#FFC107] shrink-0" />
              <span>{isAr ? 'الرياض · الدوحة · دبي · تشيناي' : 'Riyadh · Doha · Dubai · Chennai'}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs">
              <a
                href="https://wa.me/966118128181"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#33D274] text-[#04150B] font-extrabold hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="http://ab.tours/AB.Tours_CatalogueBrochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-white font-bold hover:border-[#FFC107] hover:text-[#FFC107] transition-colors"
              >
                <span>{isAr ? 'الكتيب الإلكتروني' : 'E-Brochure'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs text-[#8B93A8]">
              <a
                href="https://facebook.com/abtours24x7"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFC107] transition-colors"
              >
                Facebook
              </a>
              <span>·</span>
              <a
                href="https://instagram.com/abtours24x7"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFC107] transition-colors"
              >
                Instagram
              </a>
              <span>·</span>
              <a
                href="https://snapchat.com/add/abtours24x7"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFC107] transition-colors"
              >
                Snapchat (@abtours24x7)
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[1px] text-white mb-4">
              {isAr ? 'الوجهات والباقات' : 'Explore & Travel'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={toLocalePath('/destinations')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'اكتشف الخليج' : 'Discover the Gulf'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/tour-packages')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'الباقات السياحية' : 'Tour Packages'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/travel-styles')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'أنماط السفر' : 'Travel Styles'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/things-to-do')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'أنشطة وتجارب' : 'Things To Do'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/travel-from')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'السفر من بلدك' : 'Travelling From'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/holidays')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'عطلات خارجية' : 'Holidays Abroad'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[1px] text-white mb-4">
              {isAr ? 'الخدمات والشركة' : 'Services & Company'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={toLocalePath('/corporate-events')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'الشركات والفعاليات' : 'Corporate & Events'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/visas')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'التأشيرات وخدمات السفر' : 'Visas & Travel Services'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/travel-agents')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'لوكلاء السفر' : 'For Travel Agents'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/travel-guides')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'الأدلة السياحية' : 'Travel Guides'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/whats-on')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'فعاليات الموسم' : "What's On"}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/about-us')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'من نحن' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href={toLocalePath('/faq')} className="hover:text-[#FFC107] transition-colors">
                  {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
                </Link>
              </li>
              <li>
                <Link
                  href={toLocalePath('/plan-my-trip')}
                  className="text-[#FFC107] hover:underline font-extrabold"
                >
                  {isAr ? 'خطط رحلتك' : 'Plan My Trip'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[1px] text-white mb-4">
              {isAr ? 'المكاتب الإقليمية' : 'Regional Offices'}
            </h3>
            <div className="space-y-3 text-xs">
              {AB_OFFICES.map((office) => (
                <div key={office.city}>
                  <p className="font-bold text-white">{isAr ? office.cityAr : office.city}</p>
                  <p className="text-[#9AA4BB] flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3 h-3 text-[#40C4FF] shrink-0" />
                    <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                      {office.phone}
                    </a>
                    <span>·</span>
                    <a href={`mailto:${office.email}`} className="hover:text-white">
                      {office.email}
                    </a>
                  </p>
                </div>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-1.5">
                <a
                  href="https://ab.limo"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#FFC107] font-bold hover:underline"
                >
                  AB Transport · ab.limo
                </a>
                <Link
                  href={toLocalePath('/destinations/saudi-arabia/makkah-madinah')}
                  className="text-[#33D274] font-bold hover:underline"
                >
                  Umrah Plus
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8B93A8]">
            <span>
              © {currentYear ? `${currentYear} ` : ''}AB.Tours · A B T Travel &amp; Tourism LLC · AB Transportation Arabia LLC
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={toLocalePath('/why-travel-with-us')} className="hover:text-white">
                {isAr ? 'لماذا تسافر معنا' : 'Why Travel With Us'}
              </Link>
              <Link href={toLocalePath('/licences-and-accreditations')} className="hover:text-white">
                {isAr ? 'التراخيص والاعتمادات' : 'Licences & Accreditations'}
              </Link>
              <Link href={toLocalePath('/reviews')} className="hover:text-white">
                {isAr ? 'آراء المسافرين' : 'Reviews'}
              </Link>
              <Link href={toLocalePath('/contact-us')} className="hover:text-white">
                {isAr ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
