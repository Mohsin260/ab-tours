import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useCms } from '@/context/CmsContext';
import type { EnquiryRecord, EnquiryType } from '@/types/cms';

interface EnquiryFormProps {
  formType?: EnquiryType;
  locale: 'en' | 'ar';
  defaultDestination?: string;
}

const DESTINATION_OPTIONS = [
  'Dubai & Abu Dhabi (UAE)',
  'Riyadh (Saudi Arabia)',
  'AlUla (Saudi Arabia)',
  'Makkah & Madinah',
  'Doha (Qatar)',
  'Multi-Country Gulf',
  'Georgia / Azerbaijan',
];

export function EnquiryForm({
  formType = 'trip',
  locale,
  defaultDestination,
}: EnquiryFormProps) {
  const { submitEnquiry } = useCms();
  const isAr = locale === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [originCountry, setOriginCountry] = useState('United Kingdom');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    defaultDestination ? [defaultDestination] : ['Dubai & Abu Dhabi (UAE)']
  );
  const [travelStyle, setTravelStyle] = useState('Luxury');
  const [travelDates, setTravelDates] = useState('');
  const [guests, setGuests] = useState('2 Adults');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<EnquiryRecord | null>(null);

  const toggleDest = (dest: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError(isAr ? 'يرجى إدخال الاسم الكامل' : 'Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError(isAr ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const record = await submitEnquiry({
        type: formType,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim() || undefined,
        originCountry,
        destinations: selectedDestinations.length > 0 ? selectedDestinations : ['UAE'],
        travelStyle,
        travelDates: travelDates || 'Flexible',
        guests,
        notes: notes.trim(),
        locale,
      });
      setSubmitted(record);
    } catch {
      setFormError(isAr ? 'تعذر إرسال الطلب حالياً' : 'Unable to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#E4E0D6] rounded-2xl p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#33D274] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-anton text-2xl uppercase text-[#0B1220]">
              {isAr ? 'تم استلام طلبك بنجاح' : 'Enquiry Received'}
            </h3>
            <p className="mt-1.5 text-sm text-[#5B6373]">
              {isAr
                ? `رقم المرجع: ${submitted.id}. سيتواصل معك فريق العمليات المختص خلال 24 ساعة.`
                : `Reference ${submitted.id} has been logged with our regional desk. Expect a tailored itinerary within 24 hours.`}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(null);
                  setNotes('');
                }}
                className="px-4 py-2 text-sm font-bold rounded-full border border-[#0B1220] text-[#0B1220] hover:bg-[#0B1220] hover:text-white transition-colors"
              >
                {isAr ? 'إرسال طلب آخر' : 'Submit Another Enquiry'}
              </button>
              <Link
                href={isAr ? '/ar/tour-packages' : '/tour-packages'}
                className="px-5 py-2 text-sm font-extrabold rounded-full bg-[#FFC107] text-[#0B1220] hover:bg-[#eab000] transition-colors"
              >
                {isAr ? 'تصفح الباقات السياحية' : 'Explore Tour Packages'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#E4E0D6] rounded-2xl p-6 sm:p-8 space-y-6"
    >
      {formError && (
        <div className="p-3 rounded-lg bg-[#EA1E63]/10 border border-[#EA1E63]/30 text-sm font-medium text-[#EA1E63]">
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-1.5">
            {isAr ? 'الاسم الكامل *' : 'Full Name *'}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isAr ? 'مثال: سارة العتيبي' : 'e.g. Nadia Al-Harbi'}
            className="w-full px-3.5 py-2.5 text-sm border border-[#E4E0D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]/40 focus:border-[#0B1220]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-1.5">
            {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full px-3.5 py-2.5 text-sm border border-[#E4E0D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]/40 focus:border-[#0B1220]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-1.5">
            {isAr ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+966 11 812 8181"
            className="w-full px-3.5 py-2.5 text-sm border border-[#E4E0D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]/40 focus:border-[#0B1220]"
          />
        </div>
        {formType === 'b2b-partner' || formType === 'b2b-rates' ? (
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-1.5">
              {isAr ? 'اسم الوكالة / الشركة' : 'Agency / Company Name'}
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Travel Agency Ltd"
              className="w-full px-3.5 py-2.5 text-sm border border-[#E4E0D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]/40 focus:border-[#0B1220]"
            />
          </div>
        ) : (
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-1.5">
              {isAr ? 'بلد الانطلاق' : 'Travelling From'}
            </label>
            <input
              type="text"
              value={originCountry}
              onChange={(e) => setOriginCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-[#E4E0D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]/40 focus:border-[#0B1220]"
            />
          </div>
        )}
      </div>

      <div>
        <span className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-2">
          {isAr ? 'الوجهات المطلوبة' : 'Target Destinations'}
        </span>
        <div className="flex flex-wrap gap-2">
          {DESTINATION_OPTIONS.map((dest) => {
            const active = selectedDestinations.includes(dest);
            return (
              <button
                key={dest}
                type="button"
                onClick={() => toggleDest(dest)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                  active
                    ? 'bg-[#0B1220] text-[#FFC107] border-[#0B1220]'
                    : 'bg-[#F6F4EF] text-[#0B1220] border-[#E4E0D6] hover:border-[#0B1220]/40'
                }`}
              >
                {dest}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-1.5">
            {isAr ? 'نمط السفر' : 'Travel Style'}
          </label>
          <select
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-[#E4E0D6] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107]/40 focus:border-[#0B1220]"
          >
            <option value="Luxury">Luxury</option>
            <option value="Family">Family</option>
            <option value="Halal-Friendly">Halal-Friendly</option>
            <option value="Corporate & Events">Corporate &amp; Events</option>
            <option value="Heritage & Culture">Heritage &amp; Culture</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-1.5">
            {isAr ? 'التواريخ المقترحة' : 'Travel Dates'}
          </label>
          <input
            type="text"
            value={travelDates}
            onChange={(e) => setTravelDates(e.target.value)}
            placeholder="e.g. Dec 2026 / 5 nights"
            className="w-full px-3.5 py-2.5 text-sm border border-[#E4E0D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]/40 focus:border-[#0B1220]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-1.5">
            {isAr ? 'عدد المسافرين' : 'Guests / Group Size'}
          </label>
          <input
            type="text"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-[#E4E0D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]/40 focus:border-[#0B1220]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.4px] text-[#0B1220] mb-1.5">
          {isAr ? 'تفاصيل إضافية (الفنادق، التأشيرات، المواصلات)' : 'Itinerary, Visa or Transport Notes'}
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={
            isAr
              ? 'أخبرنا عن تفضيلات الإقامة أو متطلبات التأشيرة أو المواصلات الخاصة...'
              : 'Tell us about hotel tier, visa support, or chauffeur requirements...'
          }
          className="w-full px-3.5 py-2.5 text-sm border border-[#E4E0D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]/40 focus:border-[#0B1220]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-7 py-3.5 text-sm font-extrabold uppercase tracking-[0.4px] text-[#0B1220] bg-[#FFC107] rounded-full hover:bg-[#eab000] disabled:opacity-60 transition-colors"
      >
        {submitting
          ? isAr
            ? 'جاري الإرسال...'
            : 'Submitting...'
          : formType === 'b2b-partner'
          ? isAr
            ? 'إرسال طلب الشراكة'
            : 'Submit Partner Application'
          : formType === 'b2b-rates'
          ? isAr
            ? 'طلب الأسعار الصافية'
            : 'Request Net Rate Card'
          : isAr
          ? 'إرسال طلب التخطيط'
          : 'Plan My Trip Now'}
      </button>
    </form>
  );
}
