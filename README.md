# סטודיו נטע — אפליקציית ניהול שיעורי ציור

## הרצה ראשונה

### דרישות
- [Node.js 20+](https://nodejs.org/en/download) — יש להתקין אם עדיין לא מותקן

### התקנה והרצה
```bash
npm install
npm run dev
```

פתחי את [http://localhost:3000](http://localhost:3000) בדפדפן.

---

## מבנה הפרויקט

```
app/
  page.tsx              # מסך הבית
  schedule/page.tsx     # לוח שיעורים + בחירת תאריך
  class/[id]/page.tsx   # פרטי שיעור
  my-classes/page.tsx   # השיעורים שלי
  profile/page.tsx      # פרופיל משתמש

components/
  layout/               # Header, BottomNav, AppShell
  home/                 # UpcomingClassCard
  schedule/             # DateStrip, ClassCard
  modals/               # RegistrationTypeModal, CancelConfirmModal, SuccessModal
  ui/                   # Button, StatusBadge

lib/
  types.ts              # TypeScript types
  mock-data.ts          # נתוני דמו — לשנות לפני production
  context/AppContext.tsx # ניהול state גלובלי
  utils/dates.ts        # פונקציות תאריכים בעברית
  utils/status.ts       # לוגיקת הרשמה/ביטול
```

## המסכים הקיימים

1. **בית** — שיעור קרוב + אירועים קרובים
2. **לוח שיעורים** — פס תאריכים + כרטיסיות שיעורים (קבוצתי / אישי)
3. **פרטי שיעור** — מידע מלא + כפתור הרשמה/ביטול
4. **השיעורים שלי** — כל ההרשמות הפעילות
5. **מודל הרשמה** — בחירה בין שיעור קבוצתי לאישי
6. **מודל ביטול** — אישור ביטול עם מדיניות
7. **מודל הצלחה** — אישור לאחר פעולה

## גרסה הבאה (TODO)
- [ ] Backend אמיתי (API routes / Supabase)
- [ ] מערכת מנויים + סליקה
- [ ] ממשק ניהול למורה (נטע)
- [ ] Push notifications
- [ ] PWA (התקנה כאפליקציה)
