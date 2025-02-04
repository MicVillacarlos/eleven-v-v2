"use client"
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    //will replace this soon with conditional logic. If user === admin ? go to admin pages : go to users/lodger pages
    router.replace("/admin/dashboard");
  }, [router]);

  return null; // Add here Skeleton Page Soon
}
