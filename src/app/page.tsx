"use client"
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return null; // Optionally show a loader or blank page
}
