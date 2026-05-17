"use client";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-cream/95 backdrop-blur-sm border-b border-beige">
        <div className="flex items-center justify-between px-4 py-4 max-w-md mx-auto">
          <h1 className="text-xl font-bold text-charcoal">תקנון הסטודיו</h1>
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 py-6 pb-28 max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-base text-gray-500 leading-relaxed text-center">
            תוכן התקנון יתווסף בקרוב.
          </p>
        </div>
      </div>
    </div>
  );
}
