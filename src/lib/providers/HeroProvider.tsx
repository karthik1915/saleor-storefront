"use client";

import * as React from "react";

import { HeroUIProvider } from "@heroui/react";

function HeroProvider({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider data-source="@/lib/providers/HeroProviders">
      {children}
    </HeroUIProvider>
  );
}

// Hero Provider for using all the heroui installed component
// Module: HeroUI https://www.heroui.com/
// Usage: Wrapping Application
// Purpose: CSS styling
export default HeroProvider;
