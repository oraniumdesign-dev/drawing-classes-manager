"use client";
import { useEffect } from "react";
import { useApp } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/Button";

export function SuccessModal() {
  const { successInfo, clearSuccess } = useApp();

  // Auto-close after 4 seconds
  useEffect(() => {
    const timer = setTimeout(clearSuccess, 4000);
    return () => clearTimeout(timer);
  }, [clearSuccess]);

  if (!successInfo) return null;

  const isCancel = successInfo.title === "ההרשמה בוטלה";
  const isWaitlist = successInfo.title === "נוספת לרשימת ההמתנה";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={clearSuccess}
      />

      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isCancel
                ? "bg-gray-100"
                : isWaitlist
                ? "bg-amber-50"
                : "bg-sage-100"
            }`}
          >
            {isCancel ? (
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : isWaitlist ? (
              <svg
                className="w-8 h-8 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-sage-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold text-charcoal text-center mb-2">
          {successInfo.title}
        </h2>
        <p className="text-base text-gray-500 text-center leading-relaxed mb-6">
          {successInfo.body}
        </p>

        <Button variant="primary" size="lg" fullWidth onClick={clearSuccess}>
          הבנתי, תודה
        </Button>
      </div>
    </div>
  );
}
