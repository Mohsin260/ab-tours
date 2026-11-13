export type LaunchPhase = 'P1' | 'P2' | 'P3' | '';

export type PageType =
  | 'Home page'
  | 'Section (menu item)'
  | 'Page'
  | 'Sister brand (external)'
  | 'Conversion page';

export type PublishStatus = 'Published' | 'Draft' | 'Scheduled';

export type MediaKey =
  | 'hero-gulf'
  | 'dubai-skyline'
  | 'alula-hegra'
  | 'doha-bay'
  | 'executive-fleet';

export interface SectionDefinition {
  id: string;
  internalTerm: string;
  menuLabel: string;
  menuLabelAr: string;
  urlPattern: string;
  examplePage: string;
  primaryRoute: string;
  secondaryRoute?: string;
  description: string;
  descriptionAr: string;
}

export interface ItineraryDay {
  day: string;
  title: string;
  detail: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PageContent {
  headlineEn: string;
  headlineAr: string;
  subheadlineEn: string;
  subheadlineAr: string;
  bodyEn: string;
  bodyAr: string;
  highlightsEn: string[];
  highlightsAr: string[];
  duration?: string;
  startingPrice?: string;
  regionHub?: string;
  ctaLabelEn: string;
  ctaLabelAr: string;
  ctaTarget: string;
  seoTitle: string;
  seoDescription: string;
  itinerary?: ItineraryDay[];
  faqs?: FaqItem[];
}

export interface SitemapPage {
  rowNumber: number;
  nodeId: string;
  parentNodeId: string;
  level: number;
  section: string;
  pageName: string;
  pageNameAr: string;
  url: string;
  secondaryUrl?: string;
  arabicUrl: string;
  parentPage: string;
  pageType: PageType;
  linkType: 'Child page' | 'External link' | '';
  launchPhase: LaunchPhase;
  notes: string;
  externalUrl?: string;
  status: PublishStatus;
  mediaKey: MediaKey;
  updatedAt: string;
  content: PageContent;
}

export type EnquiryType = 'trip' | 'b2b-partner' | 'b2b-rates' | 'contact';
export type EnquiryStatus = 'New' | 'In Review' | 'Quoted' | 'Confirmed';

export interface EnquiryRecord {
  id: string;
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  company?: string;
  originCountry: string;
  destinations: string[];
  travelStyle: string;
  travelDates: string;
  guests: string;
  notes: string;
  locale: 'en' | 'ar';
  status: EnquiryStatus;
  createdAt: string;
}
