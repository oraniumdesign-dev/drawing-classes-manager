import type { User, Registration } from "./types";

export const MOCK_STUDENTS: User[] = [
  { id: "user-1",  name: "מרים כהן",     firstName: "מרים",   phone: "050-1234567", hasSubscription: true,  token: "00000000-0000-0000-0000-000000000001" },
  { id: "user-2",  name: "רחל לוי",      firstName: "רחל",    phone: "052-2345678", hasSubscription: true,  token: "00000000-0000-0000-0000-000000000002" },
  { id: "user-3",  name: "שרה ברק",      firstName: "שרה",    phone: "054-3456789", hasSubscription: false, token: "00000000-0000-0000-0000-000000000003" },
  { id: "user-4",  name: "דבורה שלום",   firstName: "דבורה",  phone: "058-4567890", hasSubscription: true,  token: "00000000-0000-0000-0000-000000000004" },
  { id: "user-5",  name: "חנה מזרחי",    firstName: "חנה",    phone: "050-5678901", hasSubscription: true,  token: "00000000-0000-0000-0000-000000000005" },
  { id: "user-6",  name: "יהודית אברהם", firstName: "יהודית", phone: "052-6789012", hasSubscription: true,  token: "00000000-0000-0000-0000-000000000006" },
  { id: "user-7",  name: "לאה גולדברג",  firstName: "לאה",    phone: "054-7890123", hasSubscription: false, token: "00000000-0000-0000-0000-000000000007" },
  { id: "user-8",  name: "רות כהן",      firstName: "רות",    phone: "058-8901234", hasSubscription: true,  token: "00000000-0000-0000-0000-000000000008" },
  { id: "user-9",  name: "אסתר לוין",    firstName: "אסתר",   phone: "050-9012345", hasSubscription: true,  token: "00000000-0000-0000-0000-000000000009" },
  { id: "user-10", name: "נעמי ברגר",    firstName: "נעמי",   phone: "052-0123456", hasSubscription: true,  token: "00000000-0000-0000-0000-000000000010" },
];

export const ALL_REGISTRATIONS: Registration[] = [
  // cls-1: ציור בצבעי מים 17/05 — 4/8 registered
  { id: "ar-1",  userId: "user-1", classId: "cls-1",  type: "subscription", status: "registered", registeredAt: "2026-05-10T09:00:00Z" },
  { id: "ar-2",  userId: "user-2", classId: "cls-1",  type: "subscription", status: "registered", registeredAt: "2026-05-11T10:00:00Z" },
  { id: "ar-3",  userId: "user-4", classId: "cls-1",  type: "subscription", status: "registered", registeredAt: "2026-05-12T11:00:00Z" },
  { id: "ar-4",  userId: "user-5", classId: "cls-1",  type: "subscription", status: "registered", registeredAt: "2026-05-13T12:00:00Z" },

  // cls-2: ציור אקריליק 17/05 — 8/8 registered + 2 waitlist
  { id: "ar-5",  userId: "user-1", classId: "cls-2",  type: "subscription", status: "registered", registeredAt: "2026-05-10T09:00:00Z" },
  { id: "ar-6",  userId: "user-2", classId: "cls-2",  type: "subscription", status: "registered", registeredAt: "2026-05-11T10:00:00Z" },
  { id: "ar-7",  userId: "user-3", classId: "cls-2",  type: "subscription", status: "registered", registeredAt: "2026-05-11T11:00:00Z" },
  { id: "ar-8",  userId: "user-4", classId: "cls-2",  type: "subscription", status: "registered", registeredAt: "2026-05-12T09:00:00Z" },
  { id: "ar-9",  userId: "user-5", classId: "cls-2",  type: "subscription", status: "registered", registeredAt: "2026-05-12T14:00:00Z" },
  { id: "ar-10", userId: "user-6", classId: "cls-2",  type: "subscription", status: "registered", registeredAt: "2026-05-13T08:00:00Z" },
  { id: "ar-11", userId: "user-8", classId: "cls-2",  type: "subscription", status: "registered", registeredAt: "2026-05-13T15:00:00Z" },
  { id: "ar-12", userId: "user-9", classId: "cls-2",  type: "subscription", status: "registered", registeredAt: "2026-05-14T10:00:00Z" },
  { id: "ar-13", userId: "user-7", classId: "cls-2",  type: "subscription", status: "waitlist",   registeredAt: "2026-05-15T09:00:00Z" },
  { id: "ar-14", userId: "user-10",classId: "cls-2",  type: "subscription", status: "waitlist",   registeredAt: "2026-05-15T10:00:00Z" },

  // cls-4: רישום למתחילות 18/05 — 6/6 registered + 1 waitlist
  { id: "ar-15", userId: "user-2", classId: "cls-4",  type: "subscription", status: "registered", registeredAt: "2026-05-10T09:00:00Z" },
  { id: "ar-16", userId: "user-3", classId: "cls-4",  type: "single",       status: "registered", registeredAt: "2026-05-11T10:00:00Z" },
  { id: "ar-17", userId: "user-5", classId: "cls-4",  type: "subscription", status: "registered", registeredAt: "2026-05-11T11:00:00Z" },
  { id: "ar-18", userId: "user-6", classId: "cls-4",  type: "subscription", status: "registered", registeredAt: "2026-05-12T09:00:00Z" },
  { id: "ar-19", userId: "user-7", classId: "cls-4",  type: "single",       status: "registered", registeredAt: "2026-05-12T14:00:00Z" },
  { id: "ar-20", userId: "user-10",classId: "cls-4",  type: "subscription", status: "registered", registeredAt: "2026-05-13T08:00:00Z" },
  { id: "ar-21", userId: "user-8", classId: "cls-4",  type: "subscription", status: "waitlist",   registeredAt: "2026-05-14T10:00:00Z" },

  // cls-5: ציור חופשי מודרך 18/05 — 3/10 registered
  { id: "ar-22", userId: "user-4", classId: "cls-5",  type: "subscription", status: "registered", registeredAt: "2026-05-10T09:00:00Z" },
  { id: "ar-23", userId: "user-8", classId: "cls-5",  type: "subscription", status: "registered", registeredAt: "2026-05-11T10:00:00Z" },
  { id: "ar-24", userId: "user-9", classId: "cls-5",  type: "subscription", status: "registered", registeredAt: "2026-05-12T11:00:00Z" },

  // cls-6: סדנת טבע דומם 19/05 — 5/8 registered
  { id: "ar-25", userId: "user-1", classId: "cls-6",  type: "subscription", status: "registered", registeredAt: "2026-05-14T10:00:00Z" },
  { id: "ar-26", userId: "user-2", classId: "cls-6",  type: "subscription", status: "registered", registeredAt: "2026-05-13T14:00:00Z" },
  { id: "ar-27", userId: "user-4", classId: "cls-6",  type: "subscription", status: "registered", registeredAt: "2026-05-12T09:00:00Z" },
  { id: "ar-28", userId: "user-5", classId: "cls-6",  type: "subscription", status: "registered", registeredAt: "2026-05-11T10:00:00Z" },
  { id: "ar-29", userId: "user-9", classId: "cls-6",  type: "single",       status: "registered", registeredAt: "2026-05-10T15:00:00Z" },

  // cls-7: שיעור אישי 19/05 — 1/1
  { id: "ar-30", userId: "user-3", classId: "cls-7",  type: "single",       status: "registered", registeredAt: "2026-05-13T09:00:00Z" },

  // cls-8: ציור בצבעי מים 20/05 — 2/8 registered
  { id: "ar-31", userId: "user-6", classId: "cls-8",  type: "subscription", status: "registered", registeredAt: "2026-05-13T09:00:00Z" },
  { id: "ar-32", userId: "user-10",classId: "cls-8",  type: "subscription", status: "registered", registeredAt: "2026-05-14T11:00:00Z" },

  // cls-10: ציור חופשי מודרך 21/05 — 8/8 registered + 2 waitlist
  { id: "ar-33", userId: "user-2", classId: "cls-10", type: "subscription", status: "registered", registeredAt: "2026-05-10T09:00:00Z" },
  { id: "ar-34", userId: "user-3", classId: "cls-10", type: "subscription", status: "registered", registeredAt: "2026-05-10T10:00:00Z" },
  { id: "ar-35", userId: "user-4", classId: "cls-10", type: "subscription", status: "registered", registeredAt: "2026-05-10T11:00:00Z" },
  { id: "ar-36", userId: "user-5", classId: "cls-10", type: "subscription", status: "registered", registeredAt: "2026-05-11T09:00:00Z" },
  { id: "ar-37", userId: "user-6", classId: "cls-10", type: "subscription", status: "registered", registeredAt: "2026-05-11T10:00:00Z" },
  { id: "ar-38", userId: "user-7", classId: "cls-10", type: "single",       status: "registered", registeredAt: "2026-05-12T09:00:00Z" },
  { id: "ar-39", userId: "user-8", classId: "cls-10", type: "subscription", status: "registered", registeredAt: "2026-05-12T10:00:00Z" },
  { id: "ar-40", userId: "user-9", classId: "cls-10", type: "subscription", status: "registered", registeredAt: "2026-05-12T11:00:00Z" },
  { id: "ar-41", userId: "user-1", classId: "cls-10", type: "subscription", status: "waitlist",   registeredAt: "2026-05-15T09:00:00Z" },
  { id: "ar-42", userId: "user-10",classId: "cls-10", type: "subscription", status: "waitlist",   registeredAt: "2026-05-15T10:00:00Z" },

  // cls-12: ציור בצבעי מים 24/05 (today) — 6/8 registered
  { id: "ar-43", userId: "user-1", classId: "cls-12", type: "subscription", status: "registered", registeredAt: "2026-05-13T14:00:00Z" },
  { id: "ar-44", userId: "user-3", classId: "cls-12", type: "single",       status: "registered", registeredAt: "2026-05-14T09:00:00Z" },
  { id: "ar-45", userId: "user-5", classId: "cls-12", type: "subscription", status: "registered", registeredAt: "2026-05-14T10:00:00Z" },
  { id: "ar-46", userId: "user-6", classId: "cls-12", type: "subscription", status: "registered", registeredAt: "2026-05-15T09:00:00Z" },
  { id: "ar-47", userId: "user-8", classId: "cls-12", type: "subscription", status: "registered", registeredAt: "2026-05-15T11:00:00Z" },
  { id: "ar-48", userId: "user-10",classId: "cls-12", type: "subscription", status: "registered", registeredAt: "2026-05-16T10:00:00Z" },

  // cls-13: סדנת טבע דומם 25/05 — 2/8 registered
  { id: "ar-49", userId: "user-4", classId: "cls-13", type: "subscription", status: "registered", registeredAt: "2026-05-14T09:00:00Z" },
  { id: "ar-50", userId: "user-7", classId: "cls-13", type: "single",       status: "registered", registeredAt: "2026-05-15T11:00:00Z" },

  // cls-14: רישום למתחילות 25/05 — 1/6 registered
  { id: "ar-51", userId: "user-9", classId: "cls-14", type: "subscription", status: "registered", registeredAt: "2026-05-15T09:00:00Z" },
];
