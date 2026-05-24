"use client";
import type { ArtClass } from "@/lib/types";
import { formatDayFull } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";
import { ALL_REGISTRATIONS, MOCK_STUDENTS } from "@/lib/admin-mock-data";

interface Props {
  cls: ArtClass;
  onClose: () => void;
}

export function RosterModal({ cls, onClose }: Props) {
  const classRegs = ALL_REGISTRATIONS.filter((r) => r.classId === cls.id);
  const registered = classRegs.filter((r) => r.status === "registered");
  const waitlist = classRegs.filter((r) => r.status === "waitlist");

  function getStudent(userId: string) {
    return MOCK_STUDENTS.find((s) => s.id === userId);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative bg-white rounded-t-3xl shadow-2xl max-h-[82vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-charcoal">{cls.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {formatDayFull(cls.date)} · {cls.startTime}–{cls.endTime}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-sm font-semibold text-rose-dust-500">
                {registered.length}/{cls.capacity} מקומות תפוסים
              </span>
              {cls.capacity - registered.length > 0 && (
                <span className="text-sm text-gray-400">
                  · {cls.capacity - registered.length} פנויים
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5"
            aria-label="סגירה"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-4 pb-10">

          {/* Registered list */}
          <p className="text-sm font-bold text-charcoal mb-2">
            נרשמות ({registered.length})
          </p>

          {registered.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">אין נרשמות עדיין</p>
          ) : (
            <div className="divide-y divide-gray-100 mb-6">
              {registered.map((reg, i) => {
                const student = getStudent(reg.userId);
                if (!student) return null;
                return (
                  <div key={reg.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-dust-100 flex items-center justify-center text-sm font-bold text-rose-dust-600 flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-base font-medium text-charcoal">{student.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{student.phone}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0",
                        reg.type === "subscription"
                          ? "bg-sage-100 text-sage-600"
                          : "bg-lavender-100 text-lavender-600"
                      )}
                    >
                      {reg.type === "subscription" ? "מנוי" : "חד-פעמי"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Waitlist */}
          {waitlist.length > 0 && (
            <>
              <p className="text-sm font-bold text-charcoal mb-2">
                רשימת המתנה ({waitlist.length})
              </p>
              <div className="divide-y divide-gray-100">
                {waitlist.map((reg, i) => {
                  const student = getStudent(reg.userId);
                  if (!student) return null;
                  return (
                    <div key={reg.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm font-bold text-amber-600 flex-shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-base font-medium text-charcoal">{student.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{student.phone}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 flex-shrink-0">
                        המתנה
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
