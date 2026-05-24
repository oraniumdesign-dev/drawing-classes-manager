"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type {
  ArtClass,
  Registration,
  RegistrationStatus,
  RegistrationType,
  User,
} from "../types";
import { getRegistrationStatus, getAvailableSpots } from "../utils/status";
import {
  registerForClass,
  cancelRegistration as cancelRegistrationAction,
  joinWaitlist as joinWaitlistAction,
} from "../actions/registrations";

interface SuccessInfo {
  title: string;
  body: string;
}

interface AppContextValue {
  user: User;
  classes: ArtClass[];
  registrations: Registration[];
  showRegistrationTypeModal: boolean;
  openRegistrationTypeModal: () => void;
  closeRegistrationTypeModal: () => void;
  cancelTargetId: string | null;
  openCancelModal: (classId: string) => void;
  closeCancelModal: () => void;
  successInfo: SuccessInfo | null;
  clearSuccess: () => void;
  getRegStatus: (classId: string) => RegistrationStatus;
  getSpots: (classId: string) => number;
  getClass: (classId: string) => ArtClass | undefined;
  getRegistration: (classId: string) => Registration | undefined;
  register: (classId: string, type: RegistrationType) => void;
  cancelRegistration: (classId: string) => void;
  joinWaitlist: (classId: string) => void;
  adminAddClass: (cls: ArtClass) => void;
  adminEditClass: (classId: string, updates: Partial<ArtClass>) => void;
  adminCancelClass: (classId: string) => void;
}

interface AppProviderProps {
  children: ReactNode;
  initialClasses: ArtClass[];
  initialRegistrations: Registration[];
  initialUser: User;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({
  children,
  initialClasses,
  initialRegistrations,
  initialUser,
}: AppProviderProps) {
  const [classes, setClasses] = useState<ArtClass[]>(initialClasses);
  const [registrations, setRegistrations] =
    useState<Registration[]>(initialRegistrations);
  const [showRegistrationTypeModal, setShowRegistrationTypeModal] =
    useState(false);
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<SuccessInfo | null>(null);

  const getRegStatus = useCallback(
    (classId: string) => getRegistrationStatus(classId, registrations),
    [registrations]
  );

  const getSpots = useCallback(
    (classId: string) => {
      const cls = classes.find((c) => c.id === classId);
      return cls ? getAvailableSpots(cls) : 0;
    },
    [classes]
  );

  const getClass = useCallback(
    (classId: string) => classes.find((c) => c.id === classId),
    [classes]
  );

  const getRegistration = useCallback(
    (classId: string) =>
      registrations.find(
        (r) => r.classId === classId && r.status !== "canceled"
      ),
    [registrations]
  );

  const register = useCallback(
    (classId: string, type: RegistrationType) => {
      const cls = classes.find((c) => c.id === classId);
      if (!cls) return;

      // Optimistic update
      const newReg: Registration = {
        id: `reg-${Date.now()}`,
        userId: initialUser.id,
        classId,
        type,
        status: "registered",
        registeredAt: new Date().toISOString(),
      };
      setRegistrations((prev) => [...prev, newReg]);
      setClasses((prev) =>
        prev.map((c) =>
          c.id === classId
            ? { ...c, registeredCount: c.registeredCount + 1 }
            : c
        )
      );
      setSuccessInfo({
        title: "נרשמת בהצלחה!",
        body: `נרשמת לשיעור "${cls.title}" ביום ${cls.date.slice(8)}.${cls.date.slice(5, 7)} בשעה ${cls.startTime}`,
      });

      registerForClass(classId, type).catch(console.error);
    },
    [classes, initialUser.id]
  );

  const cancelRegistration = useCallback(
    (classId: string) => {
      const cls = classes.find((c) => c.id === classId);
      if (!cls) return;

      // Optimistic update
      setRegistrations((prev) =>
        prev.map((r) =>
          r.classId === classId && r.status === "registered"
            ? { ...r, status: "canceled" }
            : r
        )
      );
      setClasses((prev) =>
        prev.map((c) =>
          c.id === classId
            ? { ...c, registeredCount: Math.max(0, c.registeredCount - 1) }
            : c
        )
      );
      setCancelTargetId(null);
      setSuccessInfo({
        title: "ההרשמה בוטלה",
        body: `ההרשמה שלך לשיעור "${cls.title}" בוטלה בהצלחה.`,
      });

      cancelRegistrationAction(classId).catch(console.error);
    },
    [classes]
  );

  const adminAddClass = useCallback((newClass: ArtClass) => {
    setClasses((prev) =>
      [...prev, newClass].sort((a, b) => {
        const da = `${a.date}T${a.startTime}`;
        const db = `${b.date}T${b.startTime}`;
        return da.localeCompare(db);
      })
    );
  }, []);

  const adminEditClass = useCallback(
    (classId: string, updates: Partial<ArtClass>) => {
      setClasses((prev) =>
        prev.map((c) => (c.id === classId ? { ...c, ...updates } : c))
      );
    },
    []
  );

  const adminCancelClass = useCallback((classId: string) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, status: "canceled" } : c))
    );
  }, []);

  const joinWaitlist = useCallback(
    (classId: string) => {
      const cls = classes.find((c) => c.id === classId);
      if (!cls) return;

      // Optimistic update
      const newReg: Registration = {
        id: `reg-${Date.now()}`,
        userId: initialUser.id,
        classId,
        type: "subscription",
        status: "waitlist",
        registeredAt: new Date().toISOString(),
      };
      setRegistrations((prev) => [...prev, newReg]);
      setClasses((prev) =>
        prev.map((c) =>
          c.id === classId
            ? { ...c, waitlistCount: c.waitlistCount + 1 }
            : c
        )
      );
      setSuccessInfo({
        title: "נוספת לרשימת ההמתנה",
        body: `אם תתפנה מקום בשיעור "${cls.title}", נעדכן אותך בהקדם.`,
      });

      joinWaitlistAction(classId).catch(console.error);
    },
    [classes, initialUser.id]
  );

  return (
    <AppContext.Provider
      value={{
        user: initialUser,
        classes,
        registrations,
        showRegistrationTypeModal,
        openRegistrationTypeModal: () => setShowRegistrationTypeModal(true),
        closeRegistrationTypeModal: () => setShowRegistrationTypeModal(false),
        cancelTargetId,
        openCancelModal: (id) => setCancelTargetId(id),
        closeCancelModal: () => setCancelTargetId(null),
        successInfo,
        clearSuccess: () => setSuccessInfo(null),
        getRegStatus,
        getSpots,
        getClass,
        getRegistration,
        register,
        cancelRegistration,
        joinWaitlist,
        adminAddClass,
        adminEditClass,
        adminCancelClass,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
