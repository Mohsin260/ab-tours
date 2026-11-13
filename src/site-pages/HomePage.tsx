'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Car,
  Check,
  ExternalLink,
  Headphones,
  Mail,
  Phone,
  Sparkles,
} from 'lucide-react';
import { PublicLayout } from '@/components/PublicLayout';
import { ResilientImage } from '@/components/ResilientImage';
import { AB_OFFICES } from '@/data/sitemapSeed';
import { useCms } from '@/context/CmsContext';

const HERO_VIDEOS = [
  'https://www.beesocialpk.com/ABGroup/abtours/boat-circle.mp4',
  'https://www.beesocialpk.com/ABGroup/abtours/bike.mp4',
  'https://www.beesocialpk.com/ABGroup/abtours/bikingcloseshot.mp4',
  'https://www.beesocialpk.com/ABGroup/abtours/desert-jeep.mp4',
  'https://www.beesocialpk.com/ABGroup/abtours/desert-safari.mp4',
  'https://www.beesocialpk.com/ABGroup/abtours/ocean-boat.mp4',
  'https://www.beesocialpk.com/ABGroup/abtours/speedboat.mp4',
];

const HERO_VIDEO_POSTER =
  'https://images.pexels.com/videos/11371498/pexels-photo-11371498.jpeg?auto=compress&cs=tinysrgb&h=1200&fit=crop&w=1600';

interface HomePageProps {
  locale: 'en' | 'ar';
}

const DESTINATION_THEMES: Record<
  string,
  { accent: string; overlay: string; label: string; labelAr: string }
> = {
  KSA: {
    accent: '#33D274',
    overlay: 'linear-gradient(180deg, rgba(5,44,20,0.40) 0%, rgba(5,44,20,0.92) 100%)',
    label: 'Kingdom of Saudi Arabia',
    labelAr: 'المملكة العربية السعودية',
  },
  UAE: {
    accent: '#40C4FF',
    overlay: 'linear-gradient(180deg, rgba(5,34,53,0.40) 0%, rgba(5,34,53,0.92) 100%)',
    label: 'United Arab Emirates',
    labelAr: 'الإمارات العربية المتحدة',
  },
  QA: {
    accent: '#EA1E63',
    overlay: 'linear-gradient(180deg, rgba(60,10,26,0.40) 0%, rgba(60,10,26,0.92) 100%)',
    label: 'State of Qatar',
    labelAr: 'دولة قطر',
  },
  MULTI: {
    accent: '#FFC107',
    overlay: 'linear-gradient(180deg, rgba(58,41,0,0.42) 0%, rgba(11,18,32,0.94) 100%)',
    label: 'Arabian Peninsula',
    labelAr: 'شبه الجزيرة العربية',
  },
};

export function HomePage({ locale }: HomePageProps) {
  const { pages } = useCms();
  const isAr = locale === 'ar';
  const homePage = pages.find((p) => p.nodeId === 'HOME');
  const [activeHeroVideo, setActiveHeroVideo] = useState(2);
  const heroVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const video = heroVideoRefs.current[activeHeroVideo];
    if (!video) return;

    const playback = video.play();
    if (playback) {
      void playback.catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error('Unable to play the active hero video.', error);
      });
    }

    return () => video.pause();
  }, [activeHeroVideo]);

  const toLocale = (url: string) => {
    if (!url || url.startsWith('http')) return url;
    const norm = url.startsWith('/') ? url : `/${url}`;
    if (!isAr) return norm;
    return norm === '/' ? '/ar' : `/ar${norm}`;
  };

  const destinationCountries = pages.filter(
    (p) => p.parentNodeId === 'DEST' && p.status !== 'Draft'
  );
  const featuredPackages = pages.filter(
    (p) => p.parentNodeId === 'PKG' && p.status !== 'Draft'
  );
  const travelStyles = pages.filter(
    (p) => p.parentNodeId === 'STY' && p.status !== 'Draft'
  );
  const activities = pages.filter(
    (p) => p.parentNodeId === 'TTD' && p.status !== 'Draft'
  );
  const sourceRegions = pages.filter(
    (p) => p.parentNodeId === 'FROM' && p.status !== 'Draft'
  );
  const outboundDestinations = pages.filter(
    (p) => p.parentNodeId === 'HOL' && p.status !== 'Draft'
  );

  return (
    <PublicLayout currentPage={homePage}>
      {/* AB.Tours Deep Obsidian Hero */}
      <section className="relative bg-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {HERO_VIDEOS.map((src, index) => {
            const isActive = index === activeHeroVideo;
            return (
              <video
                key={src}
                ref={(video) => {
                  heroVideoRefs.current[index] = video;
                }}
                muted
                playsInline
                poster={HERO_VIDEO_POSTER}
                preload={isActive ? 'auto' : 'none'}
                onEnded={() =>
                  setActiveHeroVideo((current) => (current + 1) % HERO_VIDEOS.length)
                }
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  isActive
                    ? 'z-[1] opacity-100'
                    : 'z-0 pointer-events-none opacity-0'
                }`}
              >
                <source src={src} type="video/mp4" />
              </video>
            );
          })}
          <div
            className="absolute inset-0 z-[2]"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, transparent 58%, rgba(11,18,32,.38) 100%), linear-gradient(90deg, rgba(11,18,32,.38) 0%, rgba(11,18,32,.08) 48%, transparent 72%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-16 sm:py-24">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[1.4px] text-[#FFC107] mb-5">
              <span className="w-6 h-[3px] rounded-full bg-[#FFC107] block" />
              <span>
                {isAr
                  ? 'المملكة العربية السعودية · الإمارات · قطر · عطلات خارجية'
                  : 'Saudi Arabia · UAE · Qatar · Curated Journeys'}
              </span>
            </div>

            <h1
              className="font-anton uppercase tracking-[0.5px] text-white leading-[0.98]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.75rem)', textWrap: 'balance' }}
            >
              {isAr ? homePage?.content.headlineAr : homePage?.content.headlineEn}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#E2E8F0] leading-relaxed max-w-2xl">
              {isAr ? homePage?.content.subheadlineAr : homePage?.content.subheadlineEn}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={toLocale('/plan-my-trip')}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-extrabold uppercase tracking-[0.4px] text-[#0B1220] bg-[#FFC107] rounded-full hover:bg-[#eab000] transition-colors whitespace-nowrap"
              >
                <span>{isAr ? 'خطط رحلتك الآن' : 'Plan My Trip Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+966118128181"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-extrabold text-white border-2 border-white/75 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>{isAr ? 'اتصل +966 11 812 8181' : 'Call +966 11 812 8181'}</span>
              </a>
              <Link
                href={toLocale('/destinations')}
                className="text-sm font-bold text-[#40C4FF] hover:underline whitespace-nowrap"
              >
                {isAr ? 'اكتشف الوجهات ←' : 'Explore destinations →'}
              </Link>
            </div>

            {/* 4-Stat Band matching AB.Tours Sky Blue Display Numerals */}
            <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="font-anton text-3xl sm:text-4xl text-[#40C4FF] tabular-nums">4</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.6px] text-[#9AA4BB]">
                  {isAr ? 'مكاتب إقليمية' : 'Operating Hubs'}
                </p>
              </div>
              <div>
                <p className="font-anton text-3xl sm:text-4xl text-[#40C4FF] tabular-nums">140+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.6px] text-[#9AA4BB]">
                  {isAr ? 'فنادق ومنتجعات متعاقدة' : 'Partner Hotels'}
                </p>
              </div>
              <div>
                <p className="font-anton text-3xl sm:text-4xl text-[#40C4FF] tabular-nums">24/7</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.6px] text-[#9AA4BB]">
                  {isAr ? 'دعم المسافرين المباشر' : 'Traveler Support'}
                </p>
              </div>
              <div>
                <p className="font-anton text-3xl sm:text-4xl text-[#40C4FF] tabular-nums">100%</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.6px] text-[#9AA4BB]">
                  {isAr ? 'أسطول خاص وتنفيذ مخصص' : 'Custom & VIP Ready'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warm Sandstone Trust Bar */}
      <div className="bg-[#F6F4EF] border-b border-[#E4E0D6]">
        <div className="max-w-[1280px] mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex items-center gap-3 font-extrabold text-sm text-[#0B1220]">
            <span className="w-9 h-9 rounded-full bg-[#33D274] text-[#052C14] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </span>
            <span>{isAr ? 'أفضل الأسعار المضمونة' : 'Best Price Guaranteed'}</span>
          </div>
          <div className="flex items-center gap-3 font-extrabold text-sm text-[#0B1220]">
            <span className="w-9 h-9 rounded-full bg-[#40C4FF] text-[#052235] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </span>
            <span>{isAr ? 'تجارب منتقاة بعناية' : 'Handpicked Experiences'}</span>
          </div>
          <div className="flex items-center gap-3 font-extrabold text-sm text-[#0B1220]">
            <span className="w-9 h-9 rounded-full bg-[#FFC107] text-[#3A2900] flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4" />
            </span>
            <span>{isAr ? 'دعم متواصل 24/7' : '24/7 Customer Support'}</span>
          </div>
          <div className="flex items-center gap-3 font-extrabold text-sm text-[#0B1220]">
            <span className="w-9 h-9 rounded-full bg-[#EA1E63] text-white flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </span>
            <span>{isAr ? 'أسطول نقل تنفيذي خاص' : 'In-House Luxury Fleet'}</span>
          </div>
        </div>
      </div>

      {/* Section 01: Discover the Gulf */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1.4px] text-[#EA1E63] mb-3">
              <span className="w-6 h-[3px] rounded-full bg-current block" />
              <span>{isAr ? 'أين نعمل' : 'Where we operate'}</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-[0.5px] text-[#0B1220]">
              {isAr ? 'اكتشف الخليج' : 'Discover the Gulf'}
            </h2>
            <p className="mt-3 text-base text-[#5B6373] max-w-2xl">
              {isAr
                ? 'عمليات أرضية مباشرة في الإمارات والمملكة العربية السعودية وقطر ورحلات الخليج المشتركة.'
                : 'Direct local ground operations across the United Arab Emirates, Saudi Arabia, Qatar, and multi-country Arabian itineraries.'}
            </p>
          </div>
          <Link
            href={toLocale('/destinations')}
            className="text-sm font-extrabold uppercase tracking-[0.4px] text-[#0055AA] hover:text-[#FFC107] transition-colors whitespace-nowrap"
          >
            {isAr ? 'عرض جميع الوجهات' : 'Explore all destinations'} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinationCountries.map((country) => {
            const cities = pages.filter((p) => p.parentNodeId === country.nodeId);
            const theme = DESTINATION_THEMES[country.nodeId] || DESTINATION_THEMES.MULTI;
            return (
              <div
                key={country.nodeId}
                className="relative rounded-2xl overflow-hidden min-h-[380px] flex flex-col justify-between text-white group"
              >
                <div className="absolute inset-0 z-0">
                  <ResilientImage
                    mediaKey={country.mediaKey}
                    aspectClass="h-full w-full"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0" style={{ background: theme.overlay }} />
                </div>

                <div className="relative z-10 p-6 flex-1 flex flex-col">
                  <p
                    className="text-[11px] font-extrabold uppercase tracking-[1.4px]"
                    style={{ color: theme.accent }}
                  >
                    {isAr ? theme.labelAr : theme.label}
                  </p>
                  <h3 className="mt-2 font-anton text-3xl uppercase tracking-[0.5px]">
                    <Link href={toLocale(country.url)} className="hover:underline">
                      {isAr ? country.pageNameAr : country.pageName}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-white/90 leading-relaxed line-clamp-3">
                    {isAr ? country.content.subheadlineAr : country.content.subheadlineEn}
                  </p>
                </div>

                <div className="relative z-10 p-6 pt-3 border-t border-white/15 space-y-3">
                  {cities.length > 0 && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-bold">
                      {cities.map((city) => (
                        <Link
                          key={city.nodeId}
                          href={toLocale(city.url)}
                          className="text-white/95 hover:text-[#FFC107] hover:underline"
                        >
                          {isAr ? city.pageNameAr : city.pageName}
                        </Link>
                      ))}
                    </div>
                  )}
                  <Link
                    href={toLocale(country.url)}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.6px]"
                    style={{ color: theme.accent }}
                  >
                    <span>{isAr ? 'استكشف الوجهة' : `See ${country.pageName}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 02: Tour Packages & Things To Do on Warm Sandstone */}
      <section className="bg-[#F6F4EF] border-y border-[#E4E0D6] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1.4px] text-[#33D274] mb-3">
                <span className="w-6 h-[3px] rounded-full bg-current block" />
                <span>{isAr ? 'لحظات حقيقية' : 'Real moments'}</span>
              </div>
              <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-[0.5px] text-[#0B1220]">
                {isAr ? 'الباقات السياحية والتجارب' : 'Tour Packages & Experiences'}
              </h2>
              <p className="mt-3 text-base text-[#5B6373] max-w-2xl">
                {isAr
                  ? 'باقات يومية مخصصة تشمل الإقامة المختارة والتنقلات الخاصة والجولات الثقافية.'
                  : 'Curated day-by-day itineraries combining contracted hotels, private chauffeur transfers, and expert local guides.'}
              </p>
            </div>
            <Link
              href={toLocale('/tour-packages')}
              className="text-sm font-extrabold uppercase tracking-[0.4px] text-[#0055AA] hover:text-[#FFC107] transition-colors whitespace-nowrap"
            >
              {isAr ? 'جميع الباقات السياحية' : 'View all packages'} →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <div
                key={pkg.nodeId}
                className="bg-white border border-[#E4E0D6] rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <ResilientImage mediaKey={pkg.mediaKey} aspectClass="aspect-[4/3]" />
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#5B6373]">
                      <span>{pkg.content.duration || (isAr ? 'متعدد الأيام' : 'Multi-Day')}</span>
                      {pkg.content.startingPrice && (
                        <span className="text-[#0B1220] text-sm font-extrabold tabular-nums">
                          {pkg.content.startingPrice}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-extrabold text-[#0B1220] leading-snug">
                      {isAr ? pkg.pageNameAr : pkg.pageName}
                    </h3>
                    <p className="mt-2 text-sm text-[#5B6373] leading-relaxed line-clamp-2">
                      {isAr ? pkg.content.subheadlineAr : pkg.content.subheadlineEn}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href={toLocale(pkg.url)}
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg border border-[#0B1220] text-sm font-bold text-[#0B1220] hover:bg-[#0B1220] hover:text-white transition-colors"
                  >
                    {isAr ? 'عرض البرنامج اليومي' : 'View Itinerary'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Things To Do */}
          <div className="mt-10 bg-white border border-[#E4E0D6] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-anton text-2xl uppercase tracking-[0.4px] text-[#0B1220]">
                  {isAr ? 'أنشطة وتجارب مميزة' : 'Things To Do Across the Gulf'}
                </h3>
                <p className="mt-1 text-sm text-[#5B6373]">
                  {isAr
                    ? 'جولات خاصة مع استقبال فندقي وأسطول دفع رباعي مرخص.'
                    : 'Handpicked excursions with door-to-door chauffeur pickup.'}
                </p>
              </div>
              <Link
                href={toLocale('/things-to-do')}
                className="text-xs font-extrabold uppercase tracking-[0.5px] text-[#0055AA] hover:text-[#FFC107]"
              >
                {isAr ? 'تصفح الأنشطة' : 'All experiences'} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activities.map((act) => (
                <Link
                  key={act.nodeId}
                  href={toLocale(act.url)}
                  className="p-4 rounded-xl bg-[#F6F4EF] border border-[#E4E0D6] hover:border-[#0B1220] transition-colors flex flex-col justify-between gap-3"
                >
                  <div>
                    <p className="font-extrabold text-sm text-[#0B1220]">
                      {isAr ? act.pageNameAr : act.pageName}
                    </p>
                    <p className="mt-1 text-xs text-[#5B6373] line-clamp-2">
                      {isAr ? act.content.subheadlineAr : act.content.subheadlineEn}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0055AA]">
                    <span>
                      {act.content.duration || ''} {act.content.startingPrice ? `· ${act.content.startingPrice}` : ''}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Travel Styles & Signature Journeys (Obsidian Dark Band) */}
      <section className="bg-[#0B1220] text-white py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1.4px] text-[#FFC107] mb-3">
                <span className="w-6 h-[3px] rounded-full bg-current block" />
                <span>{isAr ? 'صُممت لرحلتك' : 'Tailored to your journey'}</span>
              </div>
              <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-[0.5px] text-white">
                {isAr ? 'أنماط السفر المختارة' : 'Travel Styles & Signature Journeys'}
              </h2>
              <p className="mt-3 text-base text-[#C7CEDE] max-w-2xl">
                {isAr
                  ? 'برامج فاخرة، عائلية، ومتوافقة مع الضيافة الإسلامية — كل تفصيل مصمم لراحتك.'
                  : 'From private desert resorts and multi-generational family villas to culturally-attuned Halal-Friendly itineraries and Makkah & Madinah guidance.'}
              </p>
            </div>
            <Link
              href={toLocale('/travel-styles')}
              className="text-sm font-extrabold uppercase tracking-[0.4px] text-[#FFC107] hover:underline whitespace-nowrap"
            >
              {isAr ? 'جميع أنماط السفر' : 'Explore all styles'} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelStyles.map((style) => (
              <Link
                key={style.nodeId}
                href={toLocale(style.url)}
                className="bg-[#121B30] rounded-2xl p-6 sm:p-7 border border-white/10 border-t-[4px] border-t-[#FFC107] hover:bg-[#17223B] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1px] text-[#FFC107]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAr ? 'نمط سفر' : 'Travel Style'}</span>
                  </div>
                  <h3 className="mt-3 font-anton text-2xl uppercase tracking-[0.5px] text-white">
                    {isAr ? style.pageNameAr : style.pageName}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#C7CEDE] leading-relaxed">
                    {isAr ? style.content.subheadlineAr : style.content.subheadlineEn}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.6px] text-[#FFC107]">
                  <span>{isAr ? 'اكتشف البرامج' : 'Explore Collection'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04: Corporate & Events, Visas, Executive Fleet & Travel Agents */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#E4E0D6] bg-[#F6F4EF]">
            <ResilientImage
              mediaKey="executive-fleet"
              aspectClass="aspect-[16/10] lg:aspect-auto lg:h-full"
              className="w-full h-full"
            />
          </div>
          <div className="lg:col-span-7 bg-[#F6F4EF] border border-[#E4E0D6] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1.4px] text-[#0055AA] mb-3">
                <span className="w-6 h-[3px] rounded-full bg-current block" />
                <span>{isAr ? 'عمليات الشركات والنقل' : 'Full-Spectrum Gulf DMC'}</span>
              </div>
              <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-[0.5px] text-[#0B1220]">
                {isAr
                  ? 'الشركات والفعاليات، التأشيرات وشركاء السفر'
                  : 'Corporate Events, Visas & Executive Mobility'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5B6373] leading-relaxed">
                {isAr
                  ? 'نجمع بين إدارة المؤتمرات ورحلات الحوافز، وتسهيل تأشيرات الإمارات والسعودية وقطر، وخدمة النقل الفاخر عبر أسطولنا الخاص.'
                  : 'Every mile chauffeured, every permit verified — unified ground handling for corporate delegations, tourist visas, B2B travel agents, and executive airport arrivals.'}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href={toLocale('/corporate-events')}
                  className="p-4 rounded-xl bg-white border border-[#E4E0D6] hover:border-[#0B1220] transition-colors"
                >
                  <p className="text-sm font-extrabold text-[#0B1220]">
                    {isAr ? 'الشركات والفعاليات' : 'Corporate & Events'}
                  </p>
                  <p className="mt-1 text-xs text-[#5B6373]">
                    {isAr
                      ? 'رحلات الحوافز · المؤتمرات · المعارض · الجولات الجماعية'
                      : 'Incentive Trips · Conferences · Exhibitions · Group Tours'}
                  </p>
                </Link>
                <Link
                  href={toLocale('/visas')}
                  className="p-4 rounded-xl bg-white border border-[#E4E0D6] hover:border-[#0B1220] transition-colors"
                >
                  <p className="text-sm font-extrabold text-[#0B1220]">
                    {isAr ? 'التأشيرات وخدمات السفر' : 'Visas & Travel Services'}
                  </p>
                  <p className="mt-1 text-xs text-[#5B6373]">
                    {isAr
                      ? 'تأشيرات الإمارات والسعودية وقطر · الفنادق · التنقلات'
                      : 'UAE, Saudi & Qatar Visas · Hotel Bookings · Airport Transfers'}
                  </p>
                </Link>
                <Link
                  href={toLocale('/travel-agents')}
                  className="p-4 rounded-xl bg-white border border-[#E4E0D6] hover:border-[#0B1220] transition-colors"
                >
                  <p className="text-sm font-extrabold text-[#0B1220]">
                    {isAr ? 'لوكلاء السفر' : 'For Travel Agents'}
                  </p>
                  <p className="mt-1 text-xs text-[#5B6373]">
                    {isAr
                      ? 'انضم كشريك · طلب الأسعار · رحلات تعريفية · كتيبات'
                      : 'Become a Partner · Request Rates · Fam Trips · Brochures'}
                  </p>
                </Link>
                <a
                  href="https://ab.limo"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-white border-2 border-[#FFC107] hover:bg-[#FFC107]/10 transition-colors"
                >
                  <p className="text-sm font-extrabold text-[#0B1220] flex items-center gap-1.5">
                    <span>AB Transport · ab.limo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0055AA]" />
                  </p>
                  <p className="mt-1 text-xs text-[#5B6373]">
                    {isAr
                      ? 'أسطول السيارات الفاخرة واستقبال المطارات'
                      : 'Owned luxury chauffeur fleet & airport VIP arrivals'}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05: Travelling From, Holidays Abroad & Travel Guides */}
      <section className="bg-[#F6F4EF] border-y border-[#E4E0D6] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1.4px] text-[#33D274] mb-3">
              <span className="w-6 h-[3px] rounded-full bg-current block" />
              <span>{isAr ? 'أدلة وإرشادات السفر' : 'Planning resources'}</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-[0.5px] text-[#0B1220]">
              {isAr ? 'السفر من بلدك، العطلات الخارجية والأدلة' : 'Arrivals, Outbound Escapes & Guides'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E4E0D6] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-anton text-xl uppercase text-[#0B1220]">
                  {isAr ? 'السفر من بلدك' : 'Travelling From'}
                </h3>
                <p className="mt-2 text-sm text-[#5B6373]">
                  {isAr
                    ? 'معلومات التأشيرات والباقات المصممة حسب دولة الانطلاق.'
                    : 'Tailored Gulf packages and visa requirements organized by departure region.'}
                </p>
                <div className="mt-4 divide-y divide-[#E4E0D6]">
                  {sourceRegions.map((reg) => (
                    <Link
                      key={reg.nodeId}
                      href={toLocale(reg.url)}
                      className="flex items-center justify-between py-2.5 text-sm font-bold text-[#0B1220] hover:text-[#0055AA]"
                    >
                      <span>{isAr ? reg.pageNameAr : reg.pageName}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#5B6373]" />
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href={toLocale('/travel-from')}
                className="mt-5 text-xs font-extrabold uppercase tracking-[0.5px] text-[#0055AA] hover:underline"
              >
                {isAr ? 'عرض جميع الدول' : 'Browse departure regions'} →
              </Link>
            </div>

            <div className="bg-white border border-[#E4E0D6] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-anton text-xl uppercase text-[#0B1220]">
                  {isAr ? 'عطلات خارجية' : 'Holidays Abroad'}
                </h3>
                <p className="mt-2 text-sm text-[#5B6373]">
                  {isAr
                    ? 'وجهات القوقاز المفضلة للمسافرين من الرياض ودبي والدوحة.'
                    : 'Curated outbound escapes to Georgia and Azerbaijan timed for Gulf departures.'}
                </p>
                <div className="mt-4 divide-y divide-[#E4E0D6]">
                  {outboundDestinations.map((dest) => (
                    <Link
                      key={dest.nodeId}
                      href={toLocale(dest.url)}
                      className="flex items-center justify-between py-2.5 text-sm font-bold text-[#0B1220] hover:text-[#0055AA]"
                    >
                      <span>{isAr ? dest.pageNameAr : dest.pageName}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#5B6373]" />
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href={toLocale('/holidays')}
                className="mt-5 text-xs font-extrabold uppercase tracking-[0.5px] text-[#0055AA] hover:underline"
              >
                {isAr ? 'استكشاف العطلات الخارجية' : 'Explore holidays abroad'} →
              </Link>
            </div>

            <div className="bg-white border border-[#E4E0D6] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-anton text-xl uppercase text-[#0B1220]">
                  {isAr ? 'الأدلة السياحية والفعاليات' : "Travel Guides & What's On"}
                </h3>
                <p className="mt-2 text-sm text-[#5B6373]">
                  {isAr
                    ? 'نصائح عملية، تقويم موسم الرياض، وإجابات شاملة لأهم استفسارات المسافرين.'
                    : 'Visitor etiquette guides, seasonal highlights like Riyadh Season, and essential FAQs.'}
                </p>
                <div className="mt-4 divide-y divide-[#E4E0D6]">
                  <Link
                    href={toLocale('/travel-guides/saudi-arabia/what-to-wear')}
                    className="flex items-center justify-between py-2.5 text-sm font-bold text-[#0B1220] hover:text-[#0055AA]"
                  >
                    <span>{isAr ? 'دليل الملابس في السعودية' : 'What to Wear in Saudi Arabia'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5B6373]" />
                  </Link>
                  <Link
                    href={toLocale('/whats-on/riyadh-season')}
                    className="flex items-center justify-between py-2.5 text-sm font-bold text-[#0B1220] hover:text-[#0055AA]"
                  >
                    <span>{isAr ? 'موسم الرياض' : 'Riyadh Season'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5B6373]" />
                  </Link>
                  <Link
                    href={toLocale('/faq')}
                    className="flex items-center justify-between py-2.5 text-sm font-bold text-[#0B1220] hover:text-[#0055AA]"
                  >
                    <span>{isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5B6373]" />
                  </Link>
                </div>
              </div>
              <Link
                href={toLocale('/travel-guides')}
                className="mt-5 text-xs font-extrabold uppercase tracking-[0.5px] text-[#0055AA] hover:underline"
              >
                {isAr ? 'جميع الأدلة' : 'Read travel guides'} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Gold Promise Banner */}
      <section className="bg-[#FFC107] py-14 sm:py-16 text-center px-6">
        <div className="max-w-[920px] mx-auto">
          <p
            className="font-anton text-[#0B1220] leading-[1.12]"
            style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.75rem)' }}
          >
            {isAr
              ? '«رحلات سلسة. ذكريات خالدة. رحلتك — شغفنا.»'
              : '"Seamless journeys. Lasting memories. Your journey — our passion."'}
          </p>
          <span className="block mt-4 font-extrabold text-xs sm:text-sm uppercase tracking-[1.2px] text-[#0B1220]">
            {isAr ? '— وعد AB.Tours' : '— The AB.Tours Promise'}
          </span>
        </div>
      </section>

      {/* Regional Offices Strip */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1.4px] text-[#EA1E63] mb-3">
              <span className="w-6 h-[3px] rounded-full bg-current block" />
              <span>{isAr ? 'دعنا نخطط لرحلتك القادمة' : "Let's plan your next journey"}</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-[0.5px] text-[#0B1220]">
              {isAr ? 'تواصل مع أقرب مكتب لك' : 'Reach the office nearest you'}
            </h2>
            <p className="mt-3 text-base text-[#5B6373]">
              {isAr
                ? 'جميع الباقات قابلة للتخصيص للأفراد والمجموعات وكبار الشخصيات.'
                : 'All packages can be customized for private, group, and VIP travel across our four operating hubs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AB_OFFICES.map((office) => (
              <div
                key={office.city}
                className="bg-[#F6F4EF] rounded-2xl p-6 border border-[#E4E0D6] border-b-[5px] flex flex-col justify-between"
                style={{ borderBottomColor: office.accent }}
              >
                <div>
                  <h3 className="font-anton text-xl uppercase text-[#0B1220]">
                    {isAr ? office.cityAr : office.city}
                  </h3>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.5px] text-[#5B6373]">
                    {office.entity}
                  </p>
                  <p className="mt-3 text-xs text-[#5B6373] leading-relaxed">{office.address}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#E4E0D6] space-y-1.5 text-xs font-bold text-[#0B1220]">
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 hover:text-[#0055AA]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#0055AA] shrink-0" />
                    <span>{office.phone}</span>
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 hover:text-[#0055AA]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#0055AA] shrink-0" />
                    <span>{office.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Dark CTA */}
      <section className="bg-[#0B1220] text-white py-16 sm:py-24 text-center px-6">
        <div className="max-w-[760px] mx-auto">
          <h2
            className="font-anton uppercase tracking-[0.5px] leading-[1.05] text-white"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 3.75rem)' }}
          >
            {isAr ? 'هل أنت مستعد لمغامرة العمر؟' : 'Ready for the adventure of a lifetime?'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#C7CEDE] max-w-xl mx-auto">
            {isAr
              ? 'شاركنا مواعيد سفرك ووجهتك المفضلة — وسنرسل لك برنامجاً مخصصاً خلال 24 ساعة.'
              : "Tell us your dates, your style, and your destination — we'll send a tailored itinerary within 24 hours."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={toLocale('/plan-my-trip')}
              className="px-7 py-3.5 text-sm font-extrabold uppercase tracking-[0.4px] rounded-full bg-[#FFC107] text-[#0B1220] hover:bg-[#eab000] transition-colors"
            >
              {isAr ? 'احصل على برنامجي المخصص' : 'Plan My Trip Now'}
            </Link>
            <Link
              href={toLocale('/about-us')}
              className="px-6 py-3.5 text-sm font-extrabold rounded-full border-2 border-white/60 text-white hover:bg-white/10 transition-colors"
            >
              {isAr ? 'عن AB.Tours' : 'About AB.Tours'}
            </Link>
          </div>
          <p className="mt-5 text-xs text-[#8B93A8]">
            {isAr
              ? 'بدون التزام · استجابة خلال 24 ساعة · أفضل الأسعار المضمونة'
              : 'No obligation · Response within 24 hours · Best price guaranteed'}
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
