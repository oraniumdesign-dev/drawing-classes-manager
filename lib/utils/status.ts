import type { ArtClass, Registration, RegistrationStatus } from "../types";
import { isCancellationOpen } from "./dates";

export function getRegistrationStatus(
  classId: string,
  registrations: Registration[]
): RegistrationStatus {
  const reg = registrations.find(
    (r) => r.classId === classId && r.status !== "canceled"
  );
  if (!reg) return "none";
  return reg.status === "waitlist" ? "waitlist" : "registered";
}

export function getAvailableSpots(cls: ArtClass): number {
  return Math.max(0, cls.capacity - cls.registeredCount);
}

export function canRegister(
  cls: ArtClass,
  regStatus: RegistrationStatus
): boolean {
  if (cls.status === "canceled") return false;
  if (regStatus !== "none") return false;
  return getAvailableSpots(cls) > 0;
}

export function canJoinWaitlist(
  cls: ArtClass,
  regStatus: RegistrationStatus
): boolean {
  if (cls.status === "canceled") return false;
  if (regStatus !== "none") return false;
  return getAvailableSpots(cls) === 0;
}

export function canCancel(cls: ArtClass, regStatus: RegistrationStatus): boolean {
  if (regStatus !== "registered") return false;
  return isCancellationOpen(cls.date, cls.startTime, cls.cancellationDeadlineHours);
}
