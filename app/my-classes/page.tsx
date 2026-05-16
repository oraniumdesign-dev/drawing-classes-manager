"use client";
import { useApp } from "@/lib/context/AppContext";
import { UpcomingClassCard } from "@/components/home/UpcomingClassCard";
import { Button } from "@/components/ui/Button";

export default function MyClassesPage() {
  const { classes, registrations, openRegistrationTypeModal } = useApp();

  const activeRegs = registrations
    .filter((r) => r.status !== "canceled")
    .map((r) => {
      const cls = classes.find((c) => c.id === r.classId);
      return cls ? { cls, reg: r } : null;
    })
    .filter(Boolean)
    .sort((a, b) => {
      const dateA = `${a!.cls.date}T${a!.cls.startTime}`;
      const dateB = `${b!.cls.date}T${b!.cls.startTime}`;
      return dateA.localeCompare(dateB);
    });

  const registered = activeRegs.filter((r) => r!.reg.status === "registered");
  const waitlist = activeRegs.filter((r) => r!.reg.status === "waitlist");

  return (
    <div dir="rtl" className="px-4 pt-5 pb-28">
      <h1 className="text-2xl font-bold text-charcoal mb-5">השיעורים שלי</h1>

      {activeRegs.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-lavender-100 flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-10 h-10 text-lavender-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-charcoal mb-2">
            עדיין לא נרשמת לשיעורים
          </h2>
          <p className="text-base text-gray-400 mb-6 leading-relaxed">
            כאן יופיעו כל השיעורים שנרשמת אליהם.
          </p>
          <Button variant="primary" size="lg" onClick={openRegistrationTypeModal}>
            להירשם לשיעור ראשון
          </Button>
        </div>
      ) : (
        <>
          {/* Registered */}
          {registered.length > 0 && (
            <section className="mb-6">
              <h2 className="text-base font-semibold text-gray-400 mb-3">
                הרשמות פעילות · {registered.length}
              </h2>
              <div className="space-y-3">
                {registered.map((item) => (
                  <UpcomingClassCard key={item!.cls.id} cls={item!.cls} />
                ))}
              </div>
            </section>
          )}

          {/* Waitlist */}
          {waitlist.length > 0 && (
            <section className="mb-6">
              <h2 className="text-base font-semibold text-gray-400 mb-3">
                רשימות המתנה · {waitlist.length}
              </h2>
              <div className="space-y-3">
                {waitlist.map((item) => (
                  <UpcomingClassCard key={item!.cls.id} cls={item!.cls} />
                ))}
              </div>
            </section>
          )}

          {/* Add more */}
          <button
            onClick={openRegistrationTypeModal}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-rose-dust-200 text-rose-dust-500 font-medium text-base hover:bg-rose-dust-50 active:scale-[0.98] transition-all mt-2"
          >
            + הרשמה לשיעור נוסף
          </button>
        </>
      )}
    </div>
  );
}
