"use client";

import AddressForm from "@/components/user/addressForm";
import { useUserStore } from "@/store";
import { Button } from "@heroui/react";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

function AccountAddressesPage() {
  const userData = useUserStore((state) => state.user);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { defaultShippingAddress, defaultBillingAddress, addresses } = userData;

  console.log("userData", userData);

  return (
    <div className="grid grid-cols-2 gap-4 ">
      <div>
        <div className="flex items-center justify-between max-w-lg mb-4">
          <h2 className="text-2xl font-semibold ">Default Shipping Address</h2>
          <Button variant="bordered" isIconOnly size="sm" title="Edit">
            <IconEdit className="size-4" />
          </Button>
        </div>
        <AddressForm address={defaultShippingAddress} />
      </div>
      <div>
        <div className="flex items-center justify-between max-w-lg mb-4">
          <h2 className="text-2xl font-semibold ">Default Billing Address</h2>
          <Button variant="bordered" isIconOnly size="sm" title="Edit">
            <IconEdit className="size-4" />
          </Button>
        </div>
        <AddressForm address={defaultBillingAddress} />
      </div>
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold">Other Saved Addresses</h2>
        Table to be added
      </div>
    </div>
  );
}

export default AccountAddressesPage;
