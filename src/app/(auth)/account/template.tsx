"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import {
  IconLogout,
  IconMessageCircleUser,
  IconFileZip,
  IconCreditCard,
  IconHeart,
  IconMapPin,
  IconTruck,
  IconTruckDelivery,
} from "@tabler/icons-react";

function AccountLayout({ children }: { children: React.ReactNode }) {
  const { signOut } = useSaleorAuthContext();
  return (
    <main className="container mx-auto my-8">
      <div>
        <h1 className="text-2xl font-semibold">Your Account</h1>
      </div>
      <div className="grid grid-cols-[250px_1fr] my-6 ">
        <div className="flex flex-col gap-2 items-stretch justify-center px-5 *:justify-start">
          <Button as={Link} href="/account/orders" variant="bordered">
            <IconTruckDelivery />
            My Orders
          </Button>
          <Button as={Link} href="/account/addresses" variant="bordered">
            <IconMapPin />
            Your Addresses
          </Button>
          <Button as={Link} href="/account/payment-methods" variant="bordered">
            <IconCreditCard />
            Payment
          </Button>
          <Button as={Link} href="/account/saved-items" variant="bordered">
            <IconHeart />
            Saved Items
          </Button>
          <Button as={Link} href="/support?from=account" variant="bordered">
            <IconMessageCircleUser />
            Customer Support
          </Button>
          <Button color="danger" onPress={signOut}>
            <IconLogout />
            Logout
          </Button>
        </div>
        {children}
      </div>
    </main>
  );
}

export default AccountLayout;
