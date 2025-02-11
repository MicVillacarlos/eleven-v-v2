import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eleven V",
  description: "Comprehensive lodger tracking system.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
