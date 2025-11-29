"use client";

import React from "react";
import HeroProvider from "./HeroProvider";
import { ToastProvider } from "@heroui/react";
import AuthProvider from "./AuthProvider";

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <HeroProvider>
        <ToastProvider />
        {children}
      </HeroProvider>
    </AuthProvider>
  );
}

export default AppProvider;
