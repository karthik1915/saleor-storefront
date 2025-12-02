"use client";

import React from "react";
import HeroProvider from "./HeroProvider";
import AuthProvider from "./AuthProvider";
import { UserFetcher } from "./UserFetcher";
import { ToastProvider } from "@heroui/react";

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserFetcher />
      <HeroProvider>
        <ToastProvider />
        {children}
      </HeroProvider>
    </AuthProvider>
  );
}

export default AppProvider;
