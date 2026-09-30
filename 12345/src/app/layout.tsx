import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import JagoChatbot from "@/components/JagoChatbot";

export const metadata: Metadata = {
  title: "Vidvan — Unified Scholarship Platform by Ministry of Tribal Affairs",
  description:
    "A unified mobile-first platform for Scheduled Tribe students to access, track, and manage scholarship services across all five Vidvan schemes: Pre-Matric, Post-Matric, Top Class, NFST, and NOS.",
  keywords: "Vidvan, Tribal Affairs, Scholarship, ST Students, Pre-Matric, Post-Matric, Top Class, NFST, NOS, Government of India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
        <JagoChatbot />
      </body>
    </html>
  );
}
