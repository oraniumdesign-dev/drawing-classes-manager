"use client";
import Image from "next/image";
import { useApp } from "@/lib/context/AppContext";
import { UpcomingClassCard } from "@/components/home/UpcomingClassCard";
import { ClassCard } from "@/components/schedule/ClassCard";
import { Button } from "@/components/ui/Button";
import { todayStr } from "@/lib/utils/dates";

export default function HomePage() {
  const { classes, registrations, user, openRegistrationTypeModal } = useApp();
  const today = todayStr();

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

  // Classes available for registration (active, upcoming, not registered, not private)
  const registeredClassIds = new Set(
    registrations.filter((r) => r.status !== "canceled").map((r) => r.classId)
  );
  const availableClasses = classes
    .filter(
      (c) =>
        c.status !== "canceled" &&
        c.date >= today &&
        c.type !== "private" &&
        !registeredClassIds.has(c.id)
    )
    .sort((a, b) =>
      `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`)
    );

  return (
    <div dir="rtl">
      {/* Hero */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src="/hero-brushes.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
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

        {/* Available classes to register */}
        {availableClasses.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-charcoal mb-3">שיעורים לרישום</h2>
            <div className="space-y-3">
              {availableClasses.map((cls) => (
                <ClassCard key={cls.id} cls={cls} />
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
