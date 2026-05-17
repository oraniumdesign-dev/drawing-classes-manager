"use client";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-beige">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">

        {/* Profile */}
        <Link href="/profile" aria-label="האזור האישי שלי">
          <div className="w-10 h-10 rounded-full bg-rose-dust-100 border-2 border-rose-dust-200 flex items-center justify-center">
            <svg className="w-5 h-5 text-rose-dust-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
        </Link>

        {/* Studio info — centered */}
        <div className="text-center flex-1 mx-3">
          <p className="text-xs text-gray-400 leading-tight">הסטודיו לאמנות הציור</p>
          <p className="text-base font-bold text-charcoal leading-tight">נטע הראל רימון</p>
          <p className="text-xs text-gray-400 leading-tight mt-0.5">רחוב רות 21, כרמליה</p>
        </div>

        {/* Notifications only */}
        <Link href="/notifications" aria-label="התראות">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
        </Link>

      </div>
    </header>
  );
}
