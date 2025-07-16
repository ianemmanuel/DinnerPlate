"use client";

import { useEffect } from "react";
import { useAuth } from "@restaurant-webapp/lib/store/auth-store";

export default function AuthInitializer() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return null
}
