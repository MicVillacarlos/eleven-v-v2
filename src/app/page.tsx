"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");

  //   if (token) {
  //     router.replace("/admin/dashboard");
  //   } else {
  //     router.replace("/login");
  //     localStorage.removeItem("authToken")
  //   }
  // }, [router]);

  return <div className="h-screen w-screen flex item-center justify-center">Redirecting...</div> 
}
