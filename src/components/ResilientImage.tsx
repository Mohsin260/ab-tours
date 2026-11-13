import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import Image from 'next/image';
import { getMediaAsset } from '@/lib/mediaRegistry';
import type { MediaKey } from '@/types/cms';

interface ResilientImageProps {
  mediaKey?: MediaKey;
  altOverride?: string;
  className?: string;
  aspectClass?: string;
}

export function ResilientImage({
  mediaKey = 'hero-gulf',
  altOverride,
  className = '',
  aspectClass = 'aspect-[16/9]',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);
  const asset = getMediaAsset(mediaKey);
  const altText = altOverride || asset.alt;

  if (failed) {
    return (
      <div
        className={`${aspectClass} ${className} bg-gradient-to-br from-[#0F2744] via-[#1C3B63] to-[#284D7B] flex flex-col items-center justify-center p-6 text-center text-white/90`}
        role="img"
        aria-label={altText}
      >
        <Compass className="w-8 h-8 mb-2 text-amber-300/80" />
        <p className="text-sm font-medium max-w-xs">{altText}</p>
      </div>
    );
  }

  return (
    <div className={`relative ${aspectClass} ${className} overflow-hidden bg-slate-200`}>
      <Image
        src={asset.src}
        alt={altText}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}
