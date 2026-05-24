"use client";
import type { ArtClass } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface Props {
  cls: ArtClass;
  onEdit: () => void;
  onCancel: () => void;
  onRoster: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  group: "קבוצתי",
  private: "אישי",
  event: "אירוע",
};

const TYPE_COLORS: Record<string, string> = {
  group: "bg-sage-100 text-sage-600",
  private: "bg-lavender-100 text-lavender-600",
  event: "bg-rose-dust-100 text-rose-dust-600",
};

export function AdminClassCard({ cls, onEdit, onCancel, onRoster }: Props) {
  const isCanceled = cls.status === "canceled";
  const isTimeChanged = cls.status === "time-changed";
  const isFull = cls.registeredCount >= cls.capacity;

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden",
        isCanceled ? "border-gray-100 bg-gray-50 opacity-60" : "border-gray-200 bg-white"
      )}
    >
      {isCanceled && (
        <div className="flex items-center gap-1.5 bg-red-50 border-b border-red-100 px-4 py-1.5">
          <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <span className="text-xs font-semibold text-red-600">השיעור בוטל</span>
        </div>
      )}

      {isTimeChanged && (
        <div className="flex items-center gap-1.5 bg-amber-50 border-b border-amber-100 px-4 py-1.5">
          <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className="text-xs font-semibold text-amber-700">שעה שונתה מ-{cls.previousStartTime}</span>
        </div>
      )}

      <div className="p-4">
        {/* Time + title row */}
        <div className="flex items-start gap-3">
          <div className="shrink-0 text-right pt-0.5 min-w-[44px]">
            <p className="text-xl font-bold leading-none text-charcoal">{cls.startTime}</p>
            <p className="text-xs text-gray-400 mt-0.5">{cls.duration} דק׳</p>
          </div>
          <div className="w-px self-stretch bg-gray-200 mx-1 rounded-full" />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-charcoal leading-snug">{cls.title}</h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", TYPE_COLORS[cls.type])}>
                {TYPE_LABELS[cls.type]}
              </span>
              {!isCanceled && (
                <span className={cn("text-xs font-medium", isFull ? "text-red-500" : "text-gray-400")}>
                  {cls.registeredCount}/{cls.capacity} נרשמות
                  {cls.waitlistCount > 0 && (
                    <span className="text-amber-600"> · {cls.waitlistCount} המתנה</span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {!isCanceled && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={onRoster}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              נרשמות
            </button>
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
              </svg>
              עריכה
            </button>
            <button
              onClick={onCancel}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 active:scale-95 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              ביטול
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
