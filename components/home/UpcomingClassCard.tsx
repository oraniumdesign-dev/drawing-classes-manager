"use client";
import Link from "next/link";
import { ArtClass } from "@/lib/types";
import { useApp } from "@/lib/context/AppContext";
import {
  formatDayFull,
  getCancellationDeadline,
  formatDeadline,
  isCancellationOpen,
} from "@/lib/utils/dates";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

interface UpcomingClassCardProps {
  cls: ArtClass;
  isNext?: boolean;
}

export function UpcomingClassCard({ cls, isNext }: UpcomingClassCardProps) {
  const { getRegStatus, openCancelModal } = useApp();
  const regStatus = getRegStatus(cls.id);
  const cancellationOpen = isCancellationOpen(
    cls.date,
    cls.startTime,
    cls.cancellationDeadlineHours
  );
  const deadline = getCancellationDeadline(
    cls.date,
    cls.startTime,
    cls.cancellationDeadlineHours
  );

  const isWaitlist = regStatus === "waitlist";

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${
        isNext
          ? "border-rose-dust-200 bg-rose-dust-50 shadow-sm"
          : isWaitlist
          ? "border-amber-100 bg-amber-50/40"
          : "border-gray-200 bg-white"
      }`}
    >
      <Link href={`/class/${cls.id}`} className="block">
        <div className="px-4 pt-4 pb-3">
          {/* Status badge */}
          <div className="mb-2">
            {cls.status === "canceled" ? (
              <StatusBadge variant="canceled" />
            ) : cls.status === "time-changed" ? (
              <StatusBadge variant="time-changed" />
            ) : isWaitlist ? (
              <StatusBadge variant="waitlist-registered" />
            ) : (
              <StatusBadge variant="registered" />
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-charcoal leading-snug">{cls.title}</h3>

          {/* Teacher */}
          <p className="text-sm text-gray-400 mt-0.5">עם {cls.teacher.name}</p>

          {/* Date + time */}
          <div className="mt-3 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10.5h18"
              />
            </svg>
            <span className="text-base font-semibold text-charcoal">
              {formatDayFull(cls.date)} בשעה {cls.startTime}
            </span>
          </div>

          {/* Time changed notice */}
          {cls.status === "time-changed" && cls.previousStartTime && (
            <p className="mt-2 text-sm text-blue-600 font-medium">
              שעת השיעור עודכנה מ-{cls.previousStartTime} ל-{cls.startTime}
            </p>
          )}
        </div>
      </Link>

      {/* Actions */}
      {regStatus === "registered" && cls.status !== "canceled" && (
        <div className="px-4 pb-4">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => openCancelModal(cls.id)}
            disabled={!cancellationOpen}
          >
            {cancellationOpen ? "ביטול הרשמה" : "לא ניתן לבטל"}
          </Button>
          {cancellationOpen && (
            <p className="text-xs text-gray-400 text-center mt-2">
              ניתן לביטול עד {formatDeadline(deadline)}
            </p>
          )}
          {!cancellationOpen && (
            <p className="text-xs text-gray-400 text-center mt-2">
              חלון הביטול עבר
            </p>
          )}
        </div>
      )}

      {isWaitlist && (
        <div className="px-4 pb-4">
          <p className="text-sm text-amber-700 text-center">
            אם תתפנה מקום — נעדכן אותך מיד
          </p>
        </div>
      )}
    </div>
  );
}
