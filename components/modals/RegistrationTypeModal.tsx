"use client";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";

export function RegistrationTypeModal() {
  const { closeRegistrationTypeModal } = useApp();
  const router = useRouter();

  function goTo(type: "group" | "private") {
    closeRegistrationTypeModal();
    router.push(`/schedule?type=${type}`);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={closeRegistrationTypeModal}
      />

      {/* Sheet */}
      <div className="relative bg-white rounded-t-3xl shadow-2xl animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-charcoal">הרשמה חדשה</h2>
          <button
            onClick={closeRegistrationTypeModal}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
            aria-label="סגירה"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className="px-6 py-6 flex flex-col gap-4 pb-10">
          <button
            onClick={() => goTo("group")}
            className="w-full flex items-center justify-between px-5 py-5 rounded-2xl border-2 border-gray-200 bg-gray-50 hover:border-rose-dust-300 hover:bg-rose-dust-50 active:scale-[0.98] transition-all duration-150"
          >
            <span className="text-lg font-semibold text-charcoal">
              הרשמה לשיעור קבוצתי
            </span>
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
          </button>

          <button
            onClick={() => goTo("private")}
            className="w-full flex items-center justify-between px-5 py-5 rounded-2xl border-2 border-gray-200 bg-gray-50 hover:border-rose-dust-300 hover:bg-rose-dust-50 active:scale-[0.98] transition-all duration-150"
          >
            <span className="text-lg font-semibold text-charcoal">
              הרשמה לשיעור אישי
            </span>
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
