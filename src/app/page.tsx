"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect the user to the default locale when `/` is requested
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/");
  }, [router]);

  return null;
}
