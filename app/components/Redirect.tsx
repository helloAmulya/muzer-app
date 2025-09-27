"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const Redirect = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return null; 
};
