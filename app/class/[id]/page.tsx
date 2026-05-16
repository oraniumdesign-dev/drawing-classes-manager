"use client";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useApp } from "@/lib/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  formatDayFull,
  getCancellationDeadline,
  formatDeadline,
  isCancellationOpen,
} from "@/lib/utils/dates";
import { getAvailableSpots } from "@/lib/utils/status";
import { cn } from "@/lib/utils/cn";

export default function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getClass, getRegStatus, register, openCancelModal, joinWaitlist, user } = useApp();

  const cls = getClass(id);
  if (!cls) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4" dir="rtl">
        <p className="text-lg text-gray-500">השיעור לא נמצא</p>
        <Button onClick={() => router.back()}>חזרה</Button>
      </div>
    );
  }

  const regStatus = getRegStatus(id);
  const spots = getAvailableSpots(cls);
  const isFull = spots === 0;
  const isCanceled = cls.status === "canceled";
  const isRegistered = regStatus === "registered";
  const isWaitlist = regStatus === "waitlist";

  const deadline = getCancellationDeadline(cls.date, cls.startTime, cls.cancellationDeadlineHours);
  const cancelOpen = isCancellationOpen(cls.date, cls.startTime, cls.cancellationDeadlineHours);

  function handleRegister() {
    const type = user.hasSubscription ? "subscription" : "single";
    register(cls!.id, type);
    router.back();
  }

  return (
    <div className="min-h-screen bg-cream" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-cream/95 backdrop-blur-sm border-b border-beige">
        <div className="flex items-center justify-between px-4 py-4 max-w-md mx-auto">
          <h1 className="text-xl font-bold text-charcoal">פרטי השיעור</h1>
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
            aria-label="חזרה"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-44 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            isCanceled
              ? "from-gray-200 to-gray-300"
              : "from-rose-dust-100 via-lavender-100 to-sage-100"
          )}
        />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 right-8 w-24 h-24 rounded-full bg-rose-dust-300 blur-2xl" />
          <div className="absolute bottom-2 left-6 w-20 h-20 rounded-full bg-lavender-300 blur-2xl" />
        </div>
        {/* Class type icon overlay */}
        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow">
            <svg className="w-6 h-6 text-rose-dust-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-5 space-y-5 pb-36 max-w-md mx-auto">
        {/* Title block */}
        <div>
          <h2 className="text-2xl font-bold text-charcoal">{cls.title}</h2>

          {/* Date & time */}
          <p className="text-lg text-gray-600 mt-1">
            {formatDayFull(cls.date)}
          </p>
          <p className="text-xl font-semibold text-charcoal">
            {cls.startTime}–{cls.endTime}
          </p>

          {/* Status / registration badge */}
          <div className="mt-3 flex flex-wrap gap-2">
            {isCanceled && <StatusBadge variant="canceled" />}
            {cls.status === "time-changed" && <StatusBadge variant="time-changed" />}
            {isRegistered && <StatusBadge variant="registered" />}
            {isWaitlist && <StatusBadge variant="waitlist-registered" />}
            {!isCanceled && regStatus === "none" && !isFull && user.hasSubscription && (
              <StatusBadge variant="available-subscription" />
            )}
            {!isCanceled && regStatus === "none" && !isFull && !user.hasSubscription && cls.singleRegistrationEnabled && (
              <StatusBadge variant="available-single" />
            )}
            {!isCanceled && regStatus === "none" && isFull && (
              <StatusBadge variant="waitlist-available" />
            )}
          </div>

          {/* Time changed notice */}
          {cls.status === "time-changed" && cls.previousStartTime && (
            <div className="mt-3 bg-blue-50 rounded-2xl p-3 border border-blue-100">
              <p className="text-sm text-blue-700 font-medium">
                שעת השיעור עודכנה מ-{cls.previousStartTime} ל-{cls.startTime}
              </p>
            </div>
          )}

          {/* Canceled notice */}
          {isCanceled && (
            <div className="mt-3 bg-red-50 rounded-2xl p-3 border border-red-100">
              <p className="text-sm text-red-600 font-medium">
                השיעור הזה בוטל. מצטערת על אי הנוחות.
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        {cls.description && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-base text-gray-600 leading-relaxed">{cls.description}</p>
          </div>
        )}

        {/* Participants */}
        {!isCanceled && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                <span className="text-base">רשומות</span>
              </div>
              <span className="text-lg font-bold text-charcoal">
                {cls.registeredCount}/{cls.capacity}
              </span>
            </div>
            {/* Capacity bar */}
            <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isFull ? "bg-orange-400" : "bg-sage-300"
                )}
                style={{ width: `${(cls.registeredCount / cls.capacity) * 100}%` }}
              />
            </div>
            {!isFull && spots <= 3 && (
              <p className="text-sm text-orange-600 font-medium mt-2">
                נותרו {spots} מקומות בלבד
              </p>
            )}
            {isFull && cls.waitlistCount > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                {cls.waitlistCount} בנות ברשימת המתנה
              </p>
            )}
          </div>
        )}

        {/* Instructor */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="text-sm font-semibold text-gray-400 mb-3">השיעור בהדרכת</p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-rose-dust-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-rose-dust-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-charcoal">{cls.teacher.name}</p>
          </div>
        </div>

        {/* Cancellation policy */}
        {!isCanceled && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-sm font-bold text-charcoal mb-2">מדיניות ביטול לשיעור זה</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              ניתן לבטל עד {formatDeadline(deadline)}.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              לאחר מועד זה לא ניתן לבטל את ההרשמה.
            </p>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      {!isCanceled && (
        <div className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-gray-200 px-4 py-4 safe-area-pb max-w-md mx-auto">
          {isRegistered && (
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => openCancelModal(cls.id)}
              disabled={!cancelOpen}
            >
              {cancelOpen ? "ביטול הרשמה" : "לא ניתן לבטל"}
            </Button>
          )}
          {isWaitlist && (
            <div className="text-center py-2">
              <p className="text-base font-semibold text-amber-700">✓ ברשימת ההמתנה</p>
              <p className="text-sm text-gray-400 mt-1">אם תתפנה מקום — נעדכן אותך מיד</p>
            </div>
          )}
          {regStatus === "none" && !isFull && (
            <Button variant="primary" size="lg" fullWidth onClick={handleRegister}>
              להירשם לשיעור עכשיו
            </Button>
          )}
          {regStatus === "none" && isFull && (
            <Button variant="outline" size="lg" fullWidth onClick={() => { joinWaitlist(cls.id); router.back(); }}>
              להצטרף לרשימת המתנה
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
