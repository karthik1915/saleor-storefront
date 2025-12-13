"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import {
  IconLogout,
  IconMessageCircleUser,
  IconCreditCard,
  IconHeart,
  IconMapPin,
  IconTruckDelivery,
} from "@tabler/icons-react";

function AccountLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    {
      href: "/account/orders",
      icon: IconTruckDelivery,
      label: "My Orders",
    },
    {
      href: "/account/addresses",
      icon: IconMapPin,
      label: "Your Addresses",
    },
    {
      href: "/account/payment-methods",
      icon: IconCreditCard,
      label: "Payment",
    },
    {
      href: "/account/saved-items",
      icon: IconHeart,
      label: "Saved Items",
    },
    {
      href: "/support?from=account",
      icon: IconMessageCircleUser,
      label: "Customer Support",
    },
  ];

  const { signOut } = useSaleorAuthContext();
  return (
    <main className="container mx-auto my-8">
      <div>
        <h1 className="text-2xl font-semibold">Your Account</h1>
      </div>
      <div className="grid grid-cols-[250px_1fr] my-6 ">
        <div className="flex flex-col gap-2 items-stretch justify-center px-5 *:justify-start">
          {sidebarItems.map(({ href, icon: Icon, label }) => (
            <Button as={Link} href={href} key={href} variant="bordered">
              <Icon />
              {label}
            </Button>
          ))}
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
