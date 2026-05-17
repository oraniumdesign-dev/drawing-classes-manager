"use client";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
        </svg>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <span className="text-base text-charcoal font-medium">{value}</span>
    </div>
  );
}

function MenuRow({
  label,
  href,
  danger,
}: {
  label: string;
  href: string;
  danger?: boolean;
}) {
  return (
    <Link href={href} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 active:bg-gray-50 px-1">
      <span className={`text-base font-medium ${danger ? "text-red-500" : "text-charcoal"}`}>
        {label}
      </span>
      <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </Link>
  );
}

export default function ProfilePage() {
  const { user } = useApp();

  return (
    <div dir="rtl" className="pb-28">
      {/* Profile header */}
      <div className="bg-white px-4 pt-6 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-rose-dust-100 flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-rose-dust-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-charcoal">{user.name}</h1>
            <p className="text-sm text-gray-400 mt-0.5">הצטרפת: 01/01/2026</p>
          </div>
        </div>

      </div>

      {/* Personal details */}
      <div className="bg-white mx-4 mt-4 rounded-2xl border border-gray-100 px-4 overflow-hidden">
        <h2 className="text-sm font-bold text-gray-400 pt-4 pb-2">פרטים אישיים</h2>
        <div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
              </svg>
              <span className="text-sm text-gray-400">שם פרטי</span>
            </div>
            <span className="text-base text-charcoal font-medium">{user.firstName}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
              </svg>
              <span className="text-sm text-gray-400">טלפון</span>
            </div>
            <span className="text-base text-charcoal font-medium">{user.phone}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span className="text-sm text-gray-400">דואר אלקטרוני</span>
            </div>
            <span className="text-base text-charcoal font-medium">miriam@gmail.com</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
              <span className="text-sm text-gray-400">סוג מנוי</span>
            </div>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${user.hasSubscription ? "bg-sage-100 text-sage-600" : "bg-gray-100 text-gray-500"}`}>
              {user.hasSubscription ? "מנוי פעיל" : "אין מנוי"}
            </span>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="bg-white mx-4 mt-4 rounded-2xl border border-gray-100 px-4 overflow-hidden">
        <MenuRow label="תקנון הסטודיו" href="/terms" />
        <MenuRow label="התנתקות מהסטודיו" href="/logout" danger />
      </div>

      <p className="text-center text-xs text-gray-300 mt-6">
        גרסה 0.1.0
      </p>
    </div>
  );
}
