import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "./utils/providers/ToastProvider";
import { ConfirmDeleteModalProvider } from "./utils/providers/ConfirmDeleteModalProvider";

export const metadata: Metadata = {
  title: "Eleven V",
  description: "Comprehensive lodger tracking system.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <ConfirmDeleteModalProvider>{children}</ConfirmDeleteModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
