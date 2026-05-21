import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "12-Week ML Curriculum",
  description: "A personal tracker for a 12-week ML learning curriculum.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <Nav />
        <main className="container mx-auto py-6">{children}</main>
      </body>
    </html>
  );
}
