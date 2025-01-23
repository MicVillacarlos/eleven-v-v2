import Layout from "./components/Organisms/Layout";
// import type { AppProps } from "next/app";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function  RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className="bg-white"
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
