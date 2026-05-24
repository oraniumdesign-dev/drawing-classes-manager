import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { getClasses, getRegistrations, getCurrentUser } from "@/lib/queries";

export const metadata: Metadata = {
  title: "נטע הראל רימון | סטודיו לאומנות הציור",
  description: "הרשמה לשיעורי ציור וסדנאות אמנות",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "סטודיו נטע",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FAF8F5",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [classes, user] = await Promise.all([getClasses(), getCurrentUser()]);
  const registrations = await getRegistrations(user.id);

  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-heebo bg-cream antialiased">
        <AppProvider
          initialClasses={classes}
          initialRegistrations={registrations}
          initialUser={user}
        >
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
