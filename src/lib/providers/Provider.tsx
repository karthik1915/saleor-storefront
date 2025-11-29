"use client";

import React from "react";
import HeroProvider from "./HeroProvider";
import { ToastProvider } from "@heroui/react";

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <HeroProvider>
      <ToastProvider />
      {children}
    </HeroProvider>
  );
}

export default AppProvider;
