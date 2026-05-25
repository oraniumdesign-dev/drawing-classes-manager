"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { AdminClassCard } from "@/components/admin/AdminClassCard";
import { AddEditClassModal } from "@/components/admin/modals/AddEditClassModal";
import { AdminCancelModal } from "@/components/admin/modals/AdminCancelModal";
import { RosterModal } from "@/components/admin/modals/RosterModal";
import type { ArtClass } from "@/lib/types";
import {
  todayStr,
  parseDate,
  formatDateNumeric,
  formatShortDay,
  groupClassesByDate,
} from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";

type ModalState =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; cls: ArtClass }
  | { type: "cancel"; cls: ArtClass }
  | { type: "roster"; cls: ArtClass };

const HEBREW_MONTHS = [
  "ינואר","פברואר","מרץ","אפריל","מאי","יוני",
  "יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר",
];

function getWeekSunday(dateStr: string): Date {
  const d = parseDate(dateStr);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function dateToStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type Toast = { message: string; key: number };

export default function AdminPage() {
  const { classes } = useApp();
  const today = todayStr();

  const [weekStart, setWeekStart] = useState<Date>(() => getWeekSunday(today));
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [toast, setToast] = useState<Toast | null>(null);
  const [scrollToDate, setScrollToDate] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!scrollToDate) return;
    const el = document.getElementById(`day-${scrollToDate}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setScrollToDate(null);
  }, [scrollToDate]);

  function showToast(message: string) {
    setToast({ message, key: Date.now() });
  }

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return dateToStr(d);
  });

  const isCurrentWeek = weekDates.includes(today);

  const [y0, m0] = weekDates[0].split("-").map(Number);
  const [, m1] = weekDates[6].split("-").map(Number);
  const monthLabel =
    m0 === m1
      ? `${HEBREW_MONTHS[m0 - 1]} ${y0}`
      : `${HEBREW_MONTHS[m0 - 1]}–${HEBREW_MONTHS[m1 - 1]} ${y0}`;

  const weekLabel = `${formatDateNumeric(weekDates[0])} – ${formatDateNumeric(weekDates[6])}`;

  const grouped = groupClassesByDate(classes);

  function shiftWeek(delta: number) {
    setWeekStart((d) => {
      const nd = new Date(d);
      nd.setDate(nd.getDate() + delta * 7);
      return nd;
    });
  }

  function closeModal(opts?: { goToDate?: string; toast?: string; highlightId?: string }) {
    setModal({ type: "none" });
    if (opts?.goToDate) {
      setWeekStart(getWeekSunday(opts.goToDate));
      setScrollToDate(opts.goToDate);
    }
    if (opts?.toast) showToast(opts.toast);
    if (opts?.highlightId) {
      setHighlightId(opts.highlightId);
      setTimeout(() => setHighlightId(null), 1800);
    }
  }

  return (
    <div className="min-h-screen bg-cream font-heebo" dir="rtl">

      {/* ── Sticky header ───────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-md mx-auto">

          {/* Title row */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-gray-500 active:text-gray-700"
              aria-label="חזרה"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
              </svg>
              <span className="text-sm font-medium">חזרה</span>
            </Link>
            <h1 className="text-lg font-bold text-charcoal">ניהול שיעורים</h1>
            <div className="w-16" />
          </div>

          {/* Week navigation */}
          <div className="flex items-center px-3 pb-3">
            {/* Previous week — DOM first = right side in RTL */}
            <button
              onClick={() => shiftWeek(-1)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 active:bg-gray-200 flex-shrink-0"
              aria-label="שבוע קודם"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <div className="flex-1 text-center">
              <p className="text-xs text-gray-400 leading-tight">{monthLabel}</p>
              <p className="text-base font-bold text-charcoal leading-snug">{weekLabel}</p>
              {!isCurrentWeek && (
                <button
                  onClick={() => setWeekStart(getWeekSunday(today))}
                  className="text-xs text-rose-dust-500 font-semibold leading-tight mt-0.5"
                >
                  לשבוע הנוכחי
                </button>
              )}
            </div>

            {/* Next week — DOM last = left side in RTL */}
            <button
              onClick={() => shiftWeek(1)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 active:bg-gray-200 flex-shrink-0"
              aria-label="שבוע הבא"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Week content ─────────────────────────────────────── */}
      <div className="max-w-md mx-auto px-4 pt-4 pb-32 space-y-5">
        {weekDates.map((dateStr) => {
          const isToday = dateStr === today;
          const dayClasses = (grouped[dateStr] ?? []).sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
          );
          const activeCount = dayClasses.filter((c) => c.status !== "canceled").length;

          return (
            <div key={dateStr} id={`day-${dateStr}`}>
              {/* Day header */}
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className={cn(
                    "text-sm font-bold",
                    isToday ? "text-rose-dust-500" : "text-charcoal"
                  )}
                >
                  יום {formatShortDay(dateStr)}
                </span>
                <span className="text-sm text-gray-400">{formatDateNumeric(dateStr)}</span>
                {isToday && (
                  <span className="text-xs font-semibold text-rose-dust-500 bg-rose-dust-50 px-2 py-0.5 rounded-full border border-rose-dust-200">
                    היום
                  </span>
                )}
                <div className="flex-1 h-px bg-gray-100" />
                {activeCount > 0 && (
                  <span className="text-xs text-gray-400">
                    {activeCount} {activeCount === 1 ? "שיעור" : "שיעורים"}
                  </span>
                )}
              </div>

              {/* Class cards or empty */}
              {dayClasses.length > 0 ? (
                <div className="space-y-3">
                  {dayClasses.map((cls) => (
                    <AdminClassCard
                      key={cls.id}
                      cls={cls}
                      highlight={cls.id === highlightId}
                      onEdit={() => setModal({ type: "edit", cls })}
                      onCancel={() => setModal({ type: "cancel", cls })}
                      onRoster={() => setModal({ type: "roster", cls })}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 py-4 text-center">
                  <p className="text-sm text-gray-400">אין שיעורים</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── FAB ──────────────────────────────────────────────── */}
      <button
        onClick={() => setModal({ type: "add" })}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-rose-dust-400 text-white px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 text-base font-semibold active:scale-95 transition-transform z-10"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        שיעור חדש
      </button>

      {/* ── Modals ───────────────────────────────────────────── */}
      {modal.type === "add" && (
        <AddEditClassModal
          onClose={(date, newId) =>
            date
              ? closeModal({ goToDate: date, toast: "השיעור נוסף בהצלחה", highlightId: newId })
              : closeModal()
          }
        />
      )}
      {modal.type === "edit" && (
        <AddEditClassModal
          cls={modal.cls}
          onClose={(val) =>
            val === "saved"
              ? closeModal({ toast: "השיעור עודכן בהצלחה" })
              : closeModal()
          }
        />
      )}
      {modal.type === "cancel" && (
        <AdminCancelModal
          cls={modal.cls}
          onClose={(canceled) =>
            canceled
              ? closeModal({ toast: "השיעור בוטל" })
              : closeModal()
          }
        />
      )}
      {modal.type === "roster" && (
        <RosterModal cls={modal.cls} onClose={() => closeModal()} />
      )}

      {/* Toast */}
      {toast && (
        <div
          key={toast.key}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-charcoal text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-lg animate-fade-in-up"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
