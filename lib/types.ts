export type ClassType = "group" | "private" | "event";
export type RegistrationStatus = "registered" | "waitlist" | "none";
export type ClassStatus = "active" | "canceled" | "time-changed";
export type RegistrationType = "subscription" | "single";

export interface Teacher {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface ArtClass {
  id: string;
  title: string;
  type: ClassType;
  date: string;           // "YYYY-MM-DD"
  startTime: string;      // "HH:MM"
  endTime: string;        // "HH:MM"
  duration: number;       // minutes
  teacher: Teacher;
  capacity: number;
  registeredCount: number;
  waitlistCount: number;
  status: ClassStatus;
  previousStartTime?: string; // original time before time-changed
  cancellationDeadlineHours: number; // hours before class start
  registrationTypes: RegistrationType[];
  singleRegistrationEnabled: boolean;
  description?: string;
  imageUrl?: string;
}

export interface Registration {
  id: string;
  userId: string;
  classId: string;
  type: RegistrationType;
  status: "registered" | "waitlist" | "canceled";
  registeredAt: string;
}

export interface User {
  id: string;
  name: string;
  firstName: string;
  phone: string;
  hasSubscription: boolean;
}
