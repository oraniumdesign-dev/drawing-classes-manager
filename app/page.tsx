"use client";
import { useApp } from "@/lib/context/AppContext";
import { UpcomingClassCard } from "@/components/home/UpcomingClassCard";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const { classes, registrations, user, openRegistrationTypeModal } = useApp();

  // Get all active (non-canceled) registrations sorted by date
  const upcomingRegistrations = registrations
    .filter((r) => r.status !== "canceled")
    .map((r) => classes.find((c) => c.id === r.classId))
    .filter(Boolean)
    .sort((a, b) => {
      const dateA = `${a!.date}T${a!.startTime}`;
      const dateB = `${b!.date}T${b!.startTime}`;
      return dateA.localeCompare(dateB);
    });

  const nextClass = upcomingRegistrations[0];
  const moreClasses = upcomingRegistrations.slice(1);

  return (
    <div dir="rtl">
      {/* Hero */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-dust-200 via-lavender-200 to-sage-200" />
        {/* Decorative paint strokes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-rose-dust-400 blur-3xl" />
          <div className="absolute bottom-2 left-4 w-24 h-24 rounded-full bg-lavender-400 blur-2xl" />
          <div className="absolute top-8 left-1/2 w-20 h-20 rounded-full bg-sage-300 blur-2xl" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur flex items-center justify-center mb-3 shadow-md">
            {/* Palette icon */}
            <svg className="w-8 h-8 text-rose-dust-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-charcoal">נטע הראל רימון</h1>
          <p className="text-sm text-gray-600 mt-1">סטודיו לאומנות הציור</p>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-6">
        {/* Next class section */}
        {nextClass ? (
          <section>
            <h2 className="text-lg font-bold text-charcoal mb-3">
              השיעור הקרוב שלך
            </h2>
            <UpcomingClassCard cls={nextClass} isNext />
          </section>
        ) : (
          <section className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-lavender-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-lavender-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-charcoal mb-1">אין שיעורים קרובים</h2>
            <p className="text-base text-gray-400 mb-5">
              עדיין לא נרשמת לשיעורים.
            </p>
            <Button variant="primary" size="lg" onClick={openRegistrationTypeModal}>
              להירשם לשיעור
            </Button>
          </section>
        )}

        {/* More upcoming */}
        {moreClasses.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-charcoal mb-3">אירועים קרובים</h2>
            <div className="space-y-3">
              {moreClasses.map((cls) => (
                <UpcomingClassCard key={cls!.id} cls={cls!} />
              ))}
            </div>
          </section>
        )}

        {/* CTA if has classes but wants more */}
        {upcomingRegistrations.length > 0 && (
          <section className="pb-2">
            <button
              onClick={openRegistrationTypeModal}
              className="w-full py-4 rounded-2xl border-2 border-dashed border-rose-dust-200 text-rose-dust-500 font-medium text-base hover:bg-rose-dust-50 active:scale-[0.98] transition-all"
            >
              + הרשמה לשיעור נוסף
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
