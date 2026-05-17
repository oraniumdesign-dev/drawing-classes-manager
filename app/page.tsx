"use client";
import Image from "next/image";
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
          <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 shadow-md">
            <Image
              src="/nhr-logo.svg"
              alt="לוגו נטע הראל רימון"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold text-charcoal">הסטודיו לאמנות הציור</h1>
          <p className="text-base text-gray-700 mt-0.5">נטע הראל רימון</p>
          <p className="text-xs text-gray-500 mt-0.5">רחוב רות 21, כרמליה</p>
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
