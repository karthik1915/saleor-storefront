"use client";
import { Tabs, Tab } from "@heroui/react";

export function AccountOrdersPage() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="current" title="Current">
          current
        </Tab>
        <Tab key="unpaid" title="Unpaid">
          unpaid
        </Tab>
        <Tab key="allorder" title="All Orders">
          all
        </Tab>
      </Tabs>
    </div>
  );
}

export default AccountOrdersPage;
