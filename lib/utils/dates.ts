const HEBREW_DAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const HEBREW_MONTHS = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
  "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
];

export function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDayName(dateStr: string): string {
  const d = parseDate(dateStr);
  return `יום ${HEBREW_DAYS[d.getDay()]}`;
}

export function formatShortDay(dateStr: string): string {
  return HEBREW_DAYS[parseDate(dateStr).getDay()];
}

export function formatDateNumeric(dateStr: string): string {
  const d = parseDate(dateStr);
  return `${d.getDate()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function formatDayFull(dateStr: string): string {
  return `${formatDayName(dateStr)} ${formatDateNumeric(dateStr)}`;
}

export function formatMonthYear(dateStr: string): string {
  const d = parseDate(dateStr);
  return `${HEBREW_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function getCancellationDeadline(
  dateStr: string,
  startTime: string,
  hoursBeforeClass: number
): Date {
  const [h, m] = startTime.split(":").map(Number);
  const classStart = parseDate(dateStr);
  classStart.setHours(h, m, 0, 0);
  return new Date(classStart.getTime() - hoursBeforeClass * 60 * 60 * 1000);
}

export function formatDeadline(deadline: Date): string {
  const day = HEBREW_DAYS[deadline.getDay()];
  const date = `${deadline.getDate()}.${String(deadline.getMonth() + 1).padStart(2, "0")}`;
  const time = `${String(deadline.getHours()).padStart(2, "0")}:${String(deadline.getMinutes()).padStart(2, "0")}`;
  return `יום ${day}, ${date} בשעה ${time}`;
}

export function isCancellationOpen(
  dateStr: string,
  startTime: string,
  hoursBeforeClass: number
): boolean {
  const deadline = getCancellationDeadline(dateStr, startTime, hoursBeforeClass);
  return new Date() < deadline;
}

export function isClassPast(dateStr: string, endTime: string): boolean {
  const [h, m] = endTime.split(":").map(Number);
  const end = parseDate(dateStr);
  end.setHours(h, m, 0, 0);
  return new Date() > end;
}

export function getDateStrip(startDate: Date, count = 14): string[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
}

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function groupClassesByDate<T extends { date: string }>(
  items: T[]
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    acc[item.date] = acc[item.date] ?? [];
    acc[item.date].push(item);
    return acc;
  }, {});
}
