"use client";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-cream/95 backdrop-blur-sm border-b border-beige">
        <div className="flex items-center justify-between px-4 py-4 max-w-md mx-auto">
          <h1 className="text-xl font-bold text-charcoal">תקנון הסטודיו</h1>
          <button onClick={() => router.back()} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 py-6 pb-28 max-w-md mx-auto space-y-4">

        {/* שעות */}
        <Section title="שעות הסטודיו">
          <SubTitle>שיעורי בוקר</SubTitle>
          <Line>יום ב׳, ג׳, ד׳, ה׳</Line>
          <Line>בין השעות 11:00–14:00</Line>
          <SubTitle className="mt-3">שיעורי ערב</SubTitle>
          <Line>יום ב׳, ג׳, ה׳ — בין השעות 17:00–20:00</Line>
          <Line>יום ד׳ — בין השעות 16:00–19:00</Line>
        </Section>

        {/* מחירים */}
        <Section title="מחירים">
          <PriceRow title="שיעור קבוצתי" price="600 ₪" note="התשלום עבור 4 מפגשים מראש, מתבצע בכל מפגש רביעי" />
          <PriceRow title="שיעור פרטי" price="300 ₪" note="60 דקות" />
          <PriceRow title="שיעור פרטי כפול" price="450 ₪" note="90 דקות" />
          <div className="mt-3 bg-lavender-50 rounded-xl px-4 py-3 border border-lavender-100">
            <p className="text-sm text-charcoal font-medium">כמות נרשמות בכל קבוצה — עד 6</p>
          </div>
        </Section>

        {/* נהלי הסטודיו */}
        <Section title="✦ נהלי הסטודיו ✦">
          <p className="text-sm text-gray-500 mb-3">כדי לשמור על מרחב נעים, רגוע ונינוח לכולן:</p>
          <div className="space-y-3">
            <BulletItem>הסטודיו פועל ארבעה ימים בשבוע</BulletItem>
            <BulletItem>השיבוץ לכל קבוצה הוא קבוע. במידה ואת מבטלת שיעור בזמן, באחריותך למצוא מקום ולהשתבץ להשלמת השיעור, בנוסף לשיעורים הקבועים שלך.</BulletItem>
            <BulletItem>התשלום עבור ארבעה מפגשים מראש ומתבצע בכל מפגש רביעי לארבעת המפגשים הבאים.</BulletItem>
            <BulletItem>התשלום מבטיח את שמירת המקום הקבוע בקבוצה</BulletItem>
            <BulletItem>לא ניתן לשמור מקום ללא הסדרת תשלום מראש</BulletItem>
            <BulletItem>במקרה של היעדרות, יש לעדכן עד 24 שעות מראש — כך תוכלי לקבל שיעור השלמה</BulletItem>
            <BulletItem>שיעור השלמה ניתן תוך חודש, בתיאום מראש ועל בסיס מקום פנוי</BulletItem>
            <BulletItem>שיעור השלמה הוא בנוסף לשיעורים הקבועים</BulletItem>
            <BulletItem>היעדרות ללא הודעה בזמן אינה מזכה בהשלמה</BulletItem>
            <BulletItem>אפשרי עד 2 היעדרויות בחודש</BulletItem>
          </div>
        </Section>

        {/* הקפאת מנוי */}
        <Section title="✦ הקפאת מנוי ✦">
          <div className="space-y-3">
            <BulletItem>במקרים של נסיעה או אילוץ — בהודעה מראש בלבד</BulletItem>
            <BulletItem>מינימום: שבועיים, מקסימום: חודש בשנה</BulletItem>
            <BulletItem>לא ניתן להקפיא רטרואקטיבית</BulletItem>
            <BulletItem>בזמן הקפאה לא נשמר מקום קבוע בקבוצה</BulletItem>
          </div>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-base font-bold text-charcoal mb-4 text-center">{title}</h2>
      {children}
    </div>
  );
}

function SubTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm font-bold text-charcoal mb-1 ${className ?? ""}`}>{children}</p>;
}

function Line({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 leading-relaxed">{children}</p>;
}

function PriceRow({ title, price, note }: { title: string; price: string; note: string }) {
  return (
    <div className="py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-base font-semibold text-charcoal">{title}</span>
        <span className="text-base font-bold text-rose-dust-500">{price}</span>
      </div>
      <p className="text-xs text-gray-400">{note}</p>
    </div>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-rose-dust-300 mt-1 shrink-0">•</span>
      <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}
