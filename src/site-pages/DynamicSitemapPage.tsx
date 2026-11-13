'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { PublicLayout } from '@/components/PublicLayout';
import { ResilientImage } from '@/components/ResilientImage';
import { EnquiryForm } from '@/components/EnquiryForm';
import { AB_OFFICES, SECTION_DEFINITIONS } from '@/data/sitemapSeed';
import { normalizeRoutePath, useCms } from '@/context/CmsContext';
import type { EnquiryType } from '@/types/cms';

export function DynamicSitemapPage({ pathname }: { pathname: string }) {
  const { pages, findPageByUrl } = useCms();
  const { page, locale, cleanPath } = findPageByUrl(pathname);
  const { locale: detectedLocale } = normalizeRoutePath(pathname);
  const isAr = (locale || detectedLocale) === 'ar';

  useEffect(() => {
    if (page) {
      document.title = page.content.seoTitle || `${page.pageName} | AB.Tours`;
    }
  }, [page]);

  const toLocale = (url: string) => {
    if (!url || url.startsWith('http')) return url;
    const norm = url.startsWith('/') ? url : `/${url}`;
    if (!isAr) return norm;
    return norm === '/' ? '/ar' : `/ar${norm}`;
  };

  if (!page) {
    return (
      <PublicLayout>
        <section className="max-w-[900px] mx-auto px-6 py-20 text-center">
          <h1 className="font-anton text-4xl uppercase text-[#0B1220]">
            {isAr ? 'الصفحة غير متوفرة' : 'Page Not Found'}
          </h1>
          <p className="mt-3 text-sm text-[#5B6373]">
            {isAr
              ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك تصفح الوجهات أو العودة إلى الرئيسية.'
              : 'The page you requested could not be found. Explore our Gulf destinations or return to the homepage.'}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href={toLocale('/')}
              className="px-6 py-2.5 text-sm font-extrabold rounded-full bg-[#FFC107] text-[#0B1220]"
            >
              {isAr ? 'العودة للرئيسية' : 'Return Home'}
            </Link>
            <Link
              href={toLocale('/destinations')}
              className="px-5 py-2.5 text-sm font-bold rounded-full border border-[#0B1220] text-[#0B1220]"
            >
              {isAr ? 'اكتشف الخليج' : 'Discover the Gulf'}
            </Link>
          </div>
        </section>
      </PublicLayout>
    );
  }

  const childPages = pages.filter((p) => p.parentNodeId === page.nodeId);
  const siblingPages = pages.filter(
    (p) => p.section === page.section && p.nodeId !== page.nodeId && p.level === page.level
  );

  const sectionMeta = SECTION_DEFINITIONS.find((s) => s.menuLabel === page.section);
  const sectionDisplay = isAr ? sectionMeta?.menuLabelAr || page.section : page.section;

  let enquiryType: EnquiryType | null = null;
  if (cleanPath === '/plan-my-trip') enquiryType = 'trip';
  else if (cleanPath === '/travel-agents/become-a-partner') enquiryType = 'b2b-partner';
  else if (cleanPath === '/travel-agents/request-rates') enquiryType = 'b2b-rates';
  else if (cleanPath === '/contact-us') enquiryType = 'contact';

  const showOffices = cleanPath === '/about-us' || cleanPath === '/contact-us';
  const isSisterHandoff = page.nodeId === 'MAK' || page.nodeId === 'V5';
  const sisterLink =
    page.nodeId === 'MAK'
      ? {
          label: isAr ? 'عمرة بلس — Umrah Plus' : 'Umrah Plus',
          desc: isAr
            ? 'برامج العمرة والزيارة المتخصصة وخدمات التأشيرات الدينية عبر علامتنا الشقيقة.'
            : 'Dedicated spiritual itineraries, Haram-view hospitality, and Umrah services via our specialist brand.',
          href: 'https://www.ab.tours/',
        }
      : page.nodeId === 'V5'
      ? {
          label: 'AB Transport · ab.limo',
          desc: isAr
            ? 'حجز مباشر لسيارات الليموزين الفاخرة واستقبال الشخصيات في المطارات.'
            : 'Direct executive chauffeur, airport CIP meet-and-greet, and luxury fleet booking.',
          href: 'https://ab.limo',
        }
      : null;

  return (
    <PublicLayout currentPage={page}>
      {/* Hero Banner with AB.Tours Warm Sandstone & Anton Display Typography */}
      <section className="bg-[#0B1220] text-white">
        <div className="max-w-[1280px] mx-auto px-6 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1.2px] text-[#FFC107]">
                <span className="w-5 h-[3px] rounded-full bg-current block" />
                <span>
                  {sectionDisplay}
                  {page.content.regionHub ? ` · ${page.content.regionHub}` : ''}
                </span>
              </div>

              <h1
                className="mt-4 font-anton uppercase tracking-[0.5px] text-white leading-[1.02]"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3.35rem)', textWrap: 'balance' }}
              >
                {isAr ? page.content.headlineAr : page.content.headlineEn}
              </h1>

              <p className="mt-4 text-base text-[#C7CEDE] leading-relaxed max-w-2xl">
                {isAr ? page.content.subheadlineAr : page.content.subheadlineEn}
              </p>

              {(page.content.duration || page.content.startingPrice || page.content.regionHub) && (
                <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  {page.content.duration && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.5px] text-[#9AA4BB]">
                        {isAr ? 'المدة' : 'Duration'}
                      </p>
                      <p className="mt-0.5 font-bold text-white tabular-nums">{page.content.duration}</p>
                    </div>
                  )}
                  {page.content.startingPrice && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.5px] text-[#9AA4BB]">
                        {isAr ? 'الأسعار تبدأ من' : 'Starting Rate'}
                      </p>
                      <p className="mt-0.5 font-extrabold text-[#FFC107] tabular-nums">
                        {page.content.startingPrice}
                      </p>
                    </div>
                  )}
                  {page.content.regionHub && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.5px] text-[#9AA4BB]">
                        {isAr ? 'مركز العمليات' : 'Operations Hub'}
                      </p>
                      <p className="mt-0.5 font-bold text-[#40C4FF]">{page.content.regionHub}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-3">
              {page.externalUrl ? (
                <a
                  href={page.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.4px] text-[#0B1220] bg-[#FFC107] rounded-full hover:bg-[#eab000] transition-colors"
                >
                  <span>{isAr ? page.content.ctaLabelAr : page.content.ctaLabelEn}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  href={toLocale(page.content.ctaTarget || '/plan-my-trip')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.4px] text-[#0B1220] bg-[#FFC107] rounded-full hover:bg-[#eab000] transition-colors"
                >
                  <span>{isAr ? page.content.ctaLabelAr : page.content.ctaLabelEn}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {cleanPath === '/visas' && (
                <Link
                  href={toLocale('/travel-services')}
                  className="px-5 py-3 text-sm font-bold text-white border-2 border-white/50 rounded-full hover:bg-white/10"
                >
                  {isAr ? 'خدمات السفر والنقل' : 'Travel Services'}
                </Link>
              )}
              {cleanPath === '/travel-guides' && (
                <Link
                  href={toLocale('/whats-on')}
                  className="px-5 py-3 text-sm font-bold text-white border-2 border-white/50 rounded-full hover:bg-white/10"
                >
                  {isAr ? 'تقويم الفعاليات' : "What's On"}
                </Link>
              )}
              {cleanPath === '/about-us' && (
                <Link
                  href={toLocale('/contact-us')}
                  className="px-5 py-3 text-sm font-bold text-white border-2 border-white/50 rounded-full hover:bg-white/10"
                >
                  {isAr ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-[#121B30]">
              <ResilientImage
                mediaKey={page.mediaKey}
                altOverride={isAr ? page.pageNameAr : page.pageName}
                aspectClass="aspect-[4/3] lg:aspect-auto lg:h-full"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Overview + Highlights / Sister Brand Handoff */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#F6F4EF] border border-[#E4E0D6] rounded-2xl p-8">
              <h2 className="font-anton text-2xl uppercase tracking-[0.4px] text-[#0B1220]">
                {isAr ? 'نظرة عامة وتفاصيل الخدمة' : 'Overview & Experience Details'}
              </h2>
              <p className="mt-4 text-base text-[#0B1220] leading-relaxed">
                {isAr ? page.content.bodyAr : page.content.bodyEn}
              </p>
            </div>

            {page.content.itinerary && page.content.itinerary.length > 0 && (
              <div className="bg-white border border-[#E4E0D6] rounded-2xl p-8">
                <h2 className="font-anton text-2xl uppercase tracking-[0.4px] text-[#0B1220] mb-6">
                  {isAr ? 'البرنامج اليومي' : 'Day-by-Day Itinerary'}
                </h2>
                <div className="divide-y divide-[#E4E0D6]">
                  {page.content.itinerary.map((item) => (
                    <div
                      key={item.day}
                      className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4"
                    >
                      <span className="sm:col-span-2 text-xs font-mono font-extrabold uppercase text-[#0055AA]">
                        {item.day}
                      </span>
                      <div className="sm:col-span-10">
                        <h3 className="text-sm font-extrabold text-[#0B1220]">{item.title}</h3>
                        <p className="mt-1 text-sm text-[#5B6373] leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {page.content.faqs && page.content.faqs.length > 0 && (
              <div className="bg-white border border-[#E4E0D6] rounded-2xl p-8">
                <h2 className="font-anton text-2xl uppercase tracking-[0.4px] text-[#0B1220] mb-5">
                  {isAr ? 'الأسئلة المتكررة' : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-4">
                  {page.content.faqs.map((faq, idx) => (
                    <div key={idx} className="pb-4 border-b border-[#E4E0D6] last:border-b-0 last:pb-0">
                      <h3 className="text-sm font-extrabold text-[#0B1220]">{faq.q}</h3>
                      <p className="mt-1.5 text-sm text-[#5B6373] leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {enquiryType && (
              <div>
                <h2 className="font-anton text-2xl uppercase tracking-[0.4px] text-[#0B1220] mb-4">
                  {enquiryType === 'b2b-partner'
                    ? isAr
                      ? 'طلب شراكة وكلاء السفر'
                      : 'Travel Partner Application'
                    : enquiryType === 'b2b-rates'
                    ? isAr
                      ? 'طلب قائمة الأسعار الصافية'
                      : 'Request B2B Net Rates'
                    : isAr
                    ? 'إرسال طلب التخطيط'
                    : 'Send Your Travel Enquiry'}
                </h2>
                <EnquiryForm formType={enquiryType} locale={isAr ? 'ar' : 'en'} />
              </div>
            )}

            {showOffices && (
              <div className="bg-[#F6F4EF] border border-[#E4E0D6] rounded-2xl p-8">
                <h2 className="font-anton text-2xl uppercase tracking-[0.4px] text-[#0B1220] mb-6">
                  {isAr ? 'مكاتبنا الإقليمية' : 'Global & Regional Offices'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {AB_OFFICES.map((office) => (
                    <div
                      key={office.city}
                      className="bg-white p-5 rounded-2xl border border-[#E4E0D6] border-b-[4px]"
                      style={{ borderBottomColor: office.accent }}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#0055AA]">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{isAr ? office.countryAr : office.country}</span>
                      </div>
                      <p className="mt-1 font-anton text-lg uppercase text-[#0B1220]">
                        {isAr ? office.cityAr : office.city}
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-[#5B6373]">{office.entity}</p>
                      <p className="mt-2 text-xs text-[#5B6373] leading-relaxed">{office.address}</p>
                      <div className="mt-3 space-y-1 text-xs font-bold text-[#0B1220]">
                        <a
                          href={`tel:${office.phone.replace(/\s+/g, '')}`}
                          className="flex items-center gap-1.5 hover:text-[#0055AA]"
                        >
                          <Phone className="w-3 h-3 text-[#0055AA]" />
                          <span>{office.phone}</span>
                        </a>
                        <a
                          href={`mailto:${office.email}`}
                          className="flex items-center gap-1.5 hover:text-[#0055AA]"
                        >
                          <Mail className="w-3 h-3 text-[#0055AA]" />
                          <span>{office.email}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E4E0D6] rounded-2xl p-6">
              <h3 className="font-anton text-lg uppercase tracking-[0.4px] text-[#0B1220]">
                {isAr ? 'أبرز المزايا' : 'Key Highlights'}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#5B6373]">
                {(isAr ? page.content.highlightsAr : page.content.highlightsEn).map((item, i) => (
                  <li key={i} className="pb-3 border-b border-[#E4E0D6] last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {isSisterHandoff && sisterLink && (
              <div className="bg-[#0B1220] text-white border-t-[4px] border-[#FFC107] rounded-2xl p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.8px] text-[#FFC107]">
                  {isAr ? 'خدمة متخصصة ضمن المجموعة' : 'Specialist Ecosystem Partner'}
                </p>
                <h3 className="mt-1 font-anton text-2xl uppercase text-white">{sisterLink.label}</h3>
                <p className="mt-2 text-xs text-[#C7CEDE] leading-relaxed">{sisterLink.desc}</p>
                <a
                  href={sisterLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#FFC107] hover:underline"
                >
                  <span>{isAr ? 'الانتقال إلى الموقع' : `Visit ${sisterLink.label}`}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {siblingPages.length > 0 && (
              <div className="bg-[#F6F4EF] border border-[#E4E0D6] rounded-2xl p-6">
                <h3 className="font-anton text-lg uppercase tracking-[0.4px] text-[#0B1220]">
                  {isAr ? `المزيد في ${sectionDisplay}` : `More in ${sectionDisplay}`}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {siblingPages.map((sib) => (
                    <li key={sib.nodeId}>
                      <Link
                        href={toLocale(sib.url)}
                        className="flex items-center justify-between py-1.5 font-bold text-[#0B1220] hover:text-[#0055AA] hover:underline"
                      >
                        <span>{isAr ? sib.pageNameAr : sib.pageName}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#5B6373]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Child Pages Grid */}
      {childPages.length > 0 && (
        <section className="bg-[#F6F4EF] border-t border-[#E4E0D6] py-14">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="font-anton text-3xl uppercase tracking-[0.4px] text-[#0B1220] mb-8">
              {isAr ? `استكشف ضمن ${page.pageNameAr}` : `Explore ${page.pageName}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {childPages.map((child) => {
                const isExternal = child.pageType === 'Sister brand (external)';
                return (
                  <div
                    key={child.nodeId}
                    className="bg-white border border-[#E4E0D6] rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <ResilientImage mediaKey={child.mediaKey} aspectClass="aspect-[4/3]" />
                      <div className="p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.5px] text-[#0055AA]">
                          {child.content.duration || child.content.regionHub || sectionDisplay}
                        </p>
                        <h3 className="mt-1.5 font-anton text-xl uppercase text-[#0B1220]">
                          {isAr ? child.pageNameAr : child.pageName}
                        </h3>
                        <p className="mt-2 text-sm text-[#5B6373] line-clamp-2">
                          {isAr ? child.content.subheadlineAr : child.content.subheadlineEn}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2">
                      {isExternal && child.externalUrl ? (
                        <a
                          href={child.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-[#FFC107] text-[#0B1220] text-xs font-extrabold uppercase"
                        >
                          <span>{isAr ? `زيارة ${child.pageNameAr}` : `Visit ${child.pageName}`}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={toLocale(child.url)}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg border border-[#0B1220] text-xs font-extrabold uppercase text-[#0B1220] hover:bg-[#0B1220] hover:text-white transition-colors"
                        >
                          <span>{isAr ? 'اكتشف المزيد' : 'Explore'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
