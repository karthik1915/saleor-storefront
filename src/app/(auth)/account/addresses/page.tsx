"use client";

import React from "react";
import { useUserStore } from "@/store";
import DefaultShippingAddress from "./defaultAddress";
import DefaultBillingAddress from "@/app/(auth)/account/addresses/billingAddress";

function AccountAddressesPage() {
  const userData = useUserStore((state) => state.user);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { defaultShippingAddress, defaultBillingAddress } = userData;

  return (
    <div className="grid grid-cols-2 gap-4 ">
      <DefaultShippingAddress defaultShippingAddress={defaultShippingAddress} />
      <DefaultBillingAddress defaultBillingAddress={defaultBillingAddress} />
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold">Other Saved Addresses</h2>
        Table to be added
      </div>
    </div>
  );
}

export default AccountAddressesPage;
