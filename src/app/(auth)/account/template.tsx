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
  IconUser,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

function AccountLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    {
      href: "/account",
      icon: IconUserSquareRounded,
      label: "Personal Info",
    },
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
  const currPath = usePathname();
  const isActive = (href: string) => {
    if (href === "/account") {
      return currPath === "/account";
    }
    return currPath.startsWith(href);
  };

  return (
    <main className="container mx-auto my-8">
      <div>
        <h1 className="text-2xl font-semibold px-8">Your Account</h1>
      </div>
      <div className="grid grid-cols-[250px_1fr] my-6 ">
        <div className="flex flex-col gap-2 items-stretch px-5 *:justify-start ">
          {sidebarItems.map(({ href, icon: Icon, label }) => (
            <Button
              as={Link}
              href={href}
              key={href}
              variant="flat"
              color={isActive(href) ? "secondary" : "default"}
            >
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
