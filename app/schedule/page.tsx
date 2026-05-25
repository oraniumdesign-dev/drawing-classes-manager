"use client";
import { Suspense } from "react";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { DateStrip } from "@/components/schedule/DateStrip";
import { ClassCard } from "@/components/schedule/ClassCard";
import { formatDayFull, todayStr } from "@/lib/utils/dates";

function ScheduleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as "group" | "private") ?? "group";
  const { classes } = useApp();

  const [selectedDate, setSelectedDate] = useState(todayStr());

  const filteredClasses = useMemo(
    () =>
      classes.filter((c) =>
        type === "group"
          ? c.type === "group" || c.type === "event"
          : c.type === type
      ),
    [classes, type]
  );

  const availableDates = useMemo(
    () => new Set(filteredClasses.map((c) => c.date)),
    [filteredClasses]
  );

  const dayClasses = useMemo(
    () =>
      filteredClasses
        .filter((c) => c.date === selectedDate)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [filteredClasses, selectedDate]
  );

  const title = type === "group" ? "הרשמה לשיעור קבוצתי" : "הרשמה לשיעור אישי";

  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-beige">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-charcoal">{title}</h1>
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
            aria-label="סגירה"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Type toggle */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => router.push("/schedule?type=group")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              type === "group" ? "bg-white text-charcoal shadow-sm" : "text-gray-400"
            }`}
          >
            שיעורים קבוצתיים
          </button>
          <button
            onClick={() => router.push("/schedule?type=private")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              type === "private" ? "bg-white text-charcoal shadow-sm" : "text-gray-400"
            }`}
          >
            שיעורים אישיים
          </button>
        </div>
      </div>

      {/* Date strip */}
      <DateStrip
        selected={selectedDate}
        onSelect={setSelectedDate}
        availableDates={availableDates}
      />

      {/* Classes */}
      <div className="px-4 py-4 space-y-3 pb-28">
        <p className="text-base font-bold text-charcoal">
          {formatDayFull(selectedDate)}
        </p>

        {dayClasses.length === 0 ? (
          <EmptyDay />
        ) : (
          dayClasses.map((cls) => <ClassCard key={cls.id} cls={cls} />)
        )}
      </div>
    </div>
  );
}

function EmptyDay() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-lavender-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-lavender-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
        </svg>
      </div>
      <p className="text-lg font-semibold text-charcoal mb-1">אין שיעורים ביום זה</p>
      <p className="text-sm text-gray-400">בחרי תאריך אחר כדי לראות שיעורים זמינים</p>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-gray-400">טוענת...</p></div>}>
      <ScheduleContent />
    </Suspense>
  );
}
