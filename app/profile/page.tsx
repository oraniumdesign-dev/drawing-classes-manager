"use client";
import { useApp } from "@/lib/context/AppContext";

export default function ProfilePage() {
  const { user, registrations } = useApp();
  const activeCount = registrations.filter((r) => r.status === "registered").length;
  const waitlistCount = registrations.filter((r) => r.status === "waitlist").length;

  return (
    <div dir="rtl" className="px-4 pt-5 pb-28">
      <h1 className="text-2xl font-bold text-charcoal mb-6">הפרופיל שלי</h1>

      {/* User card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-rose-dust-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-rose-dust-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <div>
            <p className="text-xl font-bold text-charcoal">{user.name}</p>
            <p className="text-sm text-gray-400">{user.phone}</p>
          </div>
        </div>
      </div>

      {/* Subscription status */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-4">
        <p className="text-sm font-semibold text-gray-400 mb-2">סוג מנוי</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-charcoal">
            {user.hasSubscription ? "מנוי פעיל" : "אין מנוי"}
          </p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.hasSubscription ? "bg-sage-100 text-sage-600" : "bg-gray-100 text-gray-500"}`}>
            {user.hasSubscription ? "פעיל" : "לא פעיל"}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <p className="text-3xl font-bold text-charcoal">{activeCount}</p>
          <p className="text-sm text-gray-400 mt-1">שיעורים קרובים</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <p className="text-3xl font-bold text-amber-500">{waitlistCount}</p>
          <p className="text-sm text-gray-400 mt-1">ברשימת המתנה</p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-300 mt-8">
        גרסה 0.1.0 · בפיתוח
      </p>
    </div>
  );
}
