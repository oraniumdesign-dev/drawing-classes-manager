"use client";
import { useState } from "react";
import type { ArtClass, ClassType, RegistrationType } from "@/lib/types";
import { useApp } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/Button";
import { todayStr } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";

interface Props {
  cls?: ArtClass;
  onClose: (date?: string, newId?: string) => void;
}

interface FormState {
  title: string;
  type: ClassType;
  date: string;
  startTime: string;
  endTime: string;
  capacity: string;
  cancellationDeadlineHours: string;
  hasSubscription: boolean;
  hasSingle: boolean;
  description: string;
}

function calcDuration(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return eh * 60 + em - (sh * 60 + sm);
}

export function AddEditClassModal({ cls, onClose }: Props) {
  const { adminAddClass, adminEditClass } = useApp();
  const isEdit = !!cls;

  const [form, setForm] = useState<FormState>({
    title: cls?.title ?? "",
    type: cls?.type ?? "group",
    date: cls?.date ?? todayStr(),
    startTime: cls?.startTime ?? "10:00",
    endTime: cls?.endTime ?? "11:30",
    capacity: cls ? String(cls.capacity) : "8",
    cancellationDeadlineHours: cls ? String(cls.cancellationDeadlineHours) : "24",
    hasSubscription: cls ? cls.registrationTypes.includes("subscription") : true,
    hasSingle: cls ? cls.singleRegistrationEnabled : true,
    description: cls?.description ?? "",
  });

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit() {
    if (!form.title.trim() || !form.date) return;

    const regTypes: RegistrationType[] = [];
    if (form.hasSubscription) regTypes.push("subscription");
    if (form.hasSingle) regTypes.push("single");

    const updates: Partial<ArtClass> = {
      title: form.title.trim(),
      type: form.type,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      duration: calcDuration(form.startTime, form.endTime),
      capacity: form.type === "private" ? 1 : Number(form.capacity) || 8,
      cancellationDeadlineHours: Number(form.cancellationDeadlineHours) || 24,
      registrationTypes: regTypes,
      singleRegistrationEnabled: form.hasSingle,
      description: form.description.trim() || undefined,
      status: isEdit ? cls!.status : "active",
    };

    if (isEdit) {
      adminEditClass(cls!.id, updates);
      onClose("saved");
    } else {
      const newId = `cls-${Date.now()}`;
      adminAddClass({
        id: newId,
        teacher: { id: "teacher-1", name: "נטע הראל רימון" },
        registeredCount: 0,
        waitlistCount: 0,
        ...(updates as Omit<ArtClass, "id" | "teacher" | "registeredCount" | "waitlistCount">),
      } as ArtClass);
      onClose(form.date, newId);
    }
  }

  const isValid = form.title.trim().length > 0 && form.date.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => onClose()} />

      <div className="relative bg-white rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-charcoal">
            {isEdit ? "עריכת שיעור" : "שיעור חדש"}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
            aria-label="סגירה"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable form */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">שם השיעור</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="לדוגמה: ציור בצבעי מים"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-dust-300 focus:border-rose-dust-300"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">סוג שיעור</label>
            <div className="flex rounded-xl bg-gray-100 p-1 gap-1">
              {(["group", "private", "event"] as ClassType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("type", t)}
                  className={cn(
                    "flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all",
                    form.type === t ? "bg-white text-charcoal shadow-sm" : "text-gray-400"
                  )}
                >
                  {t === "group" ? "קבוצתי" : t === "private" ? "אישי" : "אירוע"}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">תאריך</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => { if (e.target.value) set("date", e.target.value); }}
              onInput={(e) => { const v = (e.target as HTMLInputElement).value; if (v) set("date", v); }}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-dust-300"
            />
          </div>

          {/* Time row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-charcoal mb-2">שעת התחלה</label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => set("startTime", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-dust-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-charcoal mb-2">שעת סיום</label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => set("endTime", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-dust-300"
              />
            </div>
          </div>

          {/* Capacity — group/event only */}
          {form.type !== "private" && (
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">מספר מקומות</label>
              <input
                type="number"
                min="1"
                max="50"
                value={form.capacity}
                onChange={(e) => set("capacity", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-dust-300"
              />
            </div>
          )}

          {/* Registration types */}
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-3">סוגי הרשמה</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.hasSubscription}
                  onChange={(e) => set("hasSubscription", e.target.checked)}
                  className="w-5 h-5 rounded accent-rose-dust-500"
                />
                <span className="text-base text-charcoal">מנוי</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.hasSingle}
                  onChange={(e) => set("hasSingle", e.target.checked)}
                  className="w-5 h-5 rounded accent-rose-dust-500"
                />
                <span className="text-base text-charcoal">שיעור בודד</span>
              </label>
            </div>
          </div>

          {/* Cancellation deadline */}
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">מועד אחרון לביטול</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="168"
                value={form.cancellationDeadlineHours}
                onChange={(e) => set("cancellationDeadlineHours", e.target.value)}
                className="w-24 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-dust-300"
              />
              <span className="text-sm text-gray-500">שעות לפני תחילת השיעור</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              תיאור <span className="font-normal text-gray-400">(אופציונלי)</span>
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="תיאור קצר של השיעור..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-dust-300 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pt-4 pb-10 border-t border-gray-100 flex-shrink-0">
          <Button variant="primary" size="lg" fullWidth onClick={handleSubmit} disabled={!isValid}>
            {isEdit ? "שמירת שינויים" : "הוספת שיעור"}
          </Button>
        </div>
      </div>
    </div>
  );
}
