"use client";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30" style={{ backgroundColor: "#F5C200" }}>
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">

        {/* NHR Logo — right side in RTL */}
        <div className="w-11 h-11 overflow-hidden rounded-sm flex-shrink-0">
          <Image
            src="/nhr-logo.svg"
            alt="לוגו NHR"
            width={44}
            height={44}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Studio info — centered */}
        <div className="text-center flex-1 mx-3">
          <p className="text-xs text-charcoal/70 leading-tight">הסטודיו לאמנות הציור</p>
          <p className="text-base font-bold text-charcoal leading-tight">נטע הראל רימון</p>
          <p className="text-xs text-charcoal/70 leading-tight mt-0.5">רחוב רות 21, כרמליה</p>
        </div>

        {/* Profile — left side in RTL */}
        <Link href="/profile" aria-label="האזור האישי שלי" className="flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
        </Link>

      </div>
    </header>
  );
}
