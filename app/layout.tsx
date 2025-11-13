import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatPT Atlas",
  description: "Lightweight chat UI powered by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="__app" className="min-h-screen bg-slate-50 text-slate-900">
          {children}
        </div>
      </body>
    </html>
  );
}
