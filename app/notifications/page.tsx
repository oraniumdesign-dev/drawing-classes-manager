"use client";

interface Notification {
  id: string;
  title: string;
  body: string;
  sentAt: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "התראת מערכת",
    body: "היי מרים,\nשיעור סדנת טבע דומם בתאריך 19/05/2026 בשעה 10:00 מאושר ומחכה לך.\nנתראה בסטודיו!\n\nבברכה,\nנטע הראל רימון",
    sentAt: "17/05/2026 09:00",
    read: false,
  },
  {
    id: "n2",
    title: "תזכורת לשיעור",
    body: "היי מרים,\nרצינו להזכיר לך — מחר יש לך שיעור ציור בצבעי מים בשעה 10:00.\nנשמח לראותך!\n\nבברכה,\nנטע הראל רימון",
    sentAt: "16/05/2026 18:00",
    read: false,
  },
  {
    id: "n3",
    title: "התראת מערכת",
    body: "היי מרים,\nנרשמת בהצלחה לשיעור ציור בצבעי מים ביום ראשון 24/05 בשעה 10:00.\n\nבברכה,\nנטע הראל רימון",
    sentAt: "13/05/2026 14:10",
    read: true,
  },
  {
    id: "n4",
    title: "התראת מערכת",
    body: "היי מרים,\nשעת השיעור ביום ראשון 24/05 עודכנה מ-09:00 ל-10:00.\nהשינוי עודכן בהרשמה שלך אוטומטית.\n\nבברכה,\nנטע הראל רימון",
    sentAt: "12/05/2026 11:30",
    read: true,
  },
];

export default function NotificationsPage() {
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div dir="rtl" className="px-4 pt-5 pb-28">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-charcoal">התראות ועדכונים</h1>
        {unreadCount > 0 && (
          <span className="px-3 py-1 bg-rose-dust-100 text-rose-dust-600 text-sm font-semibold rounded-full">
            {unreadCount} חדשות
          </span>
        )}
      </div>

      {MOCK_NOTIFICATIONS.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-charcoal mb-1">אין התראות</p>
          <p className="text-sm text-gray-400">כשיהיו עדכונים חדשים — הם יופיעו כאן</p>
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`rounded-2xl border p-4 ${
                n.read
                  ? "bg-white border-gray-100"
                  : "bg-rose-dust-50 border-rose-dust-100"
              }`}
            >
              {/* Title row */}
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className={`w-5 h-5 shrink-0 ${n.read ? "text-gray-400" : "text-sage-400"}`}
                  fill={n.read ? "none" : "currentColor"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <span className="font-bold text-charcoal text-base">{n.title}</span>
                {!n.read && (
                  <span className="mr-auto w-2 h-2 rounded-full bg-rose-dust-400 shrink-0" />
                )}
              </div>

              {/* Body */}
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {n.body}
              </p>

              {/* Time */}
              <p className="text-xs text-gray-400 mt-3 text-left" dir="ltr">
                נשלח ב-{n.sentAt}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
