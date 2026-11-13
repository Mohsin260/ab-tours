import heroGulfHeritage from '@/assets/images/hero_gulf_heritage_1794552824027.jpg';
import destDubaiSkyline from '@/assets/images/dest_dubai_skyline_1794552824580.jpg';
import destAlulaHegra from '@/assets/images/dest_alula_hegra_1794552825412.jpg';
import destDohaBay from '@/assets/images/dest_doha_bay_1794552825542.jpg';
import serviceExecutiveFleet from '@/assets/images/service_executive_fleet_1794552825403.jpg';
import type { StaticImageData } from 'next/image';
import type { MediaKey } from '@/types/cms';

export interface MediaAsset {
  key: MediaKey;
  src: string | StaticImageData;
  alt: string;
  caption: string;
}

export const MEDIA_REGISTRY: Record<MediaKey, MediaAsset> = {
  'hero-gulf': {
    key: 'hero-gulf',
    src: heroGulfHeritage,
    alt: 'Golden Arabian desert dunes and luxury sandstone pavilion at sunset',
    caption: 'Arabian Peninsula heritage landscapes and private desert retreats',
  },
  'dubai-skyline': {
    key: 'dubai-skyline',
    src: destDubaiSkyline,
    alt: 'Dubai waterfront promenade and city skyline reflecting warm twilight light',
    caption: 'Dubai & Abu Dhabi urban waterfronts and architectural landmarks',
  },
  'alula-hegra': {
    key: 'alula-hegra',
    src: destAlulaHegra,
    alt: 'Ancient Nabataean rock-cut sandstone tomb at Hegra in AlUla, Saudi Arabia',
    caption: 'UNESCO World Heritage canyons of AlUla and Hegra',
  },
  'doha-bay': {
    key: 'doha-bay',
    src: destDohaBay,
    alt: 'Doha West Bay skyline across calm Arabian Gulf water with traditional wooden dhow',
    caption: 'Doha Corniche, traditional dhows, and Inland Sea horizons',
  },
  'executive-fleet': {
    key: 'executive-fleet',
    src: serviceExecutiveFleet,
    alt: 'Executive black luxury sedan outside a Gulf five-star resort porte-cochère at dusk',
    caption: 'Dedicated chauffeur fleet powered by AB Transport (ab.limo)',
  },
};

export function getMediaAsset(key?: MediaKey): MediaAsset {
  if (!key || !MEDIA_REGISTRY[key]) {
    return MEDIA_REGISTRY['hero-gulf'];
  }
  return MEDIA_REGISTRY[key];
}
