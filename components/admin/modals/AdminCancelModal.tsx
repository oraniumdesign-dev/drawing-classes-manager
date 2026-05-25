"use client";
import type { ArtClass } from "@/lib/types";
import { useApp } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/Button";
import { formatDayFull } from "@/lib/utils/dates";
import { ALL_REGISTRATIONS } from "@/lib/admin-mock-data";

interface Props {
  cls: ArtClass;
  onClose: (canceled?: boolean) => void;
}

export function AdminCancelModal({ cls, onClose }: Props) {
  const { adminCancelClass } = useApp();

  const registeredCount = ALL_REGISTRATIONS.filter(
    (r) => r.classId === cls.id && r.status === "registered"
  ).length;

  function handleCancel() {
    adminCancelClass(cls.id);
    onClose(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => onClose()} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold text-charcoal text-center mb-2">לבטל את השיעור?</h2>
        <p className="text-base font-semibold text-gray-700 text-center mb-1">{cls.title}</p>
        <p className="text-base text-gray-500 text-center mb-5">
          {formatDayFull(cls.date)} · {cls.startTime}
        </p>

        {registeredCount > 0 && (
          <div className="bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-100">
            <p className="text-sm font-semibold text-amber-800 mb-0.5">
              {registeredCount === 1 ? "תלמידה אחת רשומה" : `${registeredCount} תלמידות רשומות`}
            </p>
            <p className="text-sm text-amber-700">
              כולן יקבלו הודעה על ביטול השיעור.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button variant="danger" size="lg" fullWidth onClick={handleCancel}>
            כן, לבטל את השיעור
          </Button>
          <Button variant="ghost" size="lg" fullWidth onClick={() => onClose()}>
            לא, לשמור על השיעור
          </Button>
        </div>
      </div>
    </div>
  );
}
