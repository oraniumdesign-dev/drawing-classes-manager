"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStudent } from "@/lib/actions/students";
import type { User } from "@/lib/types";

interface Props {
  onClose: () => void;
}

interface FormState {
  name: string;
  firstName: string;
  phone: string;
  hasSubscription: boolean;
}

export function AddStudentModal({ onClose }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    firstName: "",
    phone: "",
    hasSubscription: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    if (!form.name.trim() || !form.firstName.trim() || !form.phone.trim()) {
      setError("יש למלא את כל השדות");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const user = await createStudent({
        name: form.name.trim(),
        firstName: form.firstName.trim(),
        phone: form.phone.trim(),
        hasSubscription: form.hasSubscription,
      });
      setCreated(user);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה ביצירת תלמידה");
    } finally {
      setLoading(false);
    }
  }

  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://drawing-classes-manager.vercel.app";

  const link = created ? `${appUrl}/?t=${created.token}` : "";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      dir="rtl"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl px-5 pt-5 pb-10 animate-fade-in-up">
        {/* Handle */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        {!created ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-lg font-bold text-charcoal">הוספת תלמידה</h2>
              <div className="w-8" />
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">
                  שם משפחה
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="כהן"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-dust-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">
                  שם פרטי
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  placeholder="מרים"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-dust-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">
                  טלפון
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="050-0000000"
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-dust-300 focus:border-transparent text-right"
                />
              </div>

              {/* Subscription toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-charcoal">מנויה</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {form.hasSubscription ? "מנוי חודשי / סמסטריאלי" : "שיעורים בודדים בלבד"}
                  </p>
                </div>
                <button
                  onClick={() => set("hasSubscription", !form.hasSubscription)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    form.hasSubscription ? "bg-sage-400" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                      form.hasSubscription ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-rose-dust-400 text-white font-semibold text-base active:scale-95 transition-transform disabled:opacity-60 disabled:scale-100"
              >
                {loading ? "שומרת..." : "הוספת תלמידה"}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success state */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-lg font-bold text-charcoal">התלמידה נוספה!</h2>
              <div className="w-8" />
            </div>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="text-base font-bold text-charcoal">{created.name}</p>
              <p className="text-sm text-gray-500">{created.phone}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-sm font-semibold text-charcoal mb-2">
                קישור כניסה אישי — שלחי ב-WhatsApp:
              </p>
              <p className="text-xs text-gray-500 font-mono break-all mb-3" dir="ltr">
                {link}
              </p>
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-charcoal active:scale-95 transition-all"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    הועתק!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                    </svg>
                    העתק קישור
                  </>
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-3 py-3 rounded-2xl text-gray-500 text-sm font-medium"
            >
              סגור
            </button>
          </>
        )}
      </div>
    </div>
  );
}
