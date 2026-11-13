import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CmsProvider } from "@/context/CmsContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "AB.Tours — Journeys Across the Gulf & Beyond | Destination Management",
  description:
    "AB.Tours: Curated Gulf itineraries, desert safaris, heritage tours, visa services, and executive chauffeur transfers across UAE, Saudi Arabia, and Qatar.",
  openGraph: {
    title: "AB.Tours — Journeys Across the Gulf & Beyond",
    description:
      "AB.Tours: Curated Gulf itineraries, desert safaris, heritage tours, visa services, and executive chauffeur transfers across UAE, Saudi Arabia, and Qatar.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-[#0b1220] antialiased selection:bg-[#ffc107] selection:text-[#0b1220]">
        <CmsProvider>{children}</CmsProvider>
      </body>
    </html>
  );
}
