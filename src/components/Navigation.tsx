"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link as HeroLink,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@heroui/react";
import { Avatar } from "@heroui/avatar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import CartCardTiny from "./product/CartCardTiny";
import { useUserStore } from "@/store/UserStore";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Navigation() {
  const router = useRouter();
  const currPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const user = useUserStore((s) => s.user);
  const lines = useUserStore((s) => s.lines);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const topMenuItems = ["Products", "Categories", "Collections"];

  const { signOut } = useSaleorAuthContext();

  const handleLogout = () => {
    signOut();
    router.refresh();
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <Link href="/">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Link href="/">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </Link>

        {topMenuItems.map((item, index) => (
          <NavbarItem
            key={index}
            isActive={currPath.startsWith(`/${item.toLowerCase()}`)}
          >
            <Link color="foreground" href={`/${item.toLowerCase()}`}>
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button onPress={onOpen}>Cart</Button>
        </NavbarItem>

        <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">
                  My Cart
                </DrawerHeader>
                <DrawerBody>
                  {lines.length === 0 ? (
                    <p>You Cart is Empty</p>
                  ) : (
                    lines.map((line) => (
                      <CartCardTiny key={line.id} line={line} />
                    ))
                  )}
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      router.push("/checkout");
                      onClose();
                    }}
                  >
                    Checkout
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>

        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              <Avatar
                isBordered
                radius="full"
                showFallback
                classNames={{
                  base: "bg-linear-to-br from-[#ffffaa] to-[#f1f1f1]",
                  icon: "text-black/80",
                }}
                className="text-md"
                color={user ? "success" : "default"}
                name={
                  user
                    ? user.firstName?.trim()
                      ? `${user.firstName} ${user.lastName ?? ""}`.trim()
                      : user.email
                    : "Guest"
                }
              />
            </DropdownTrigger>
            <DropdownMenu>
              {!user ? (
                <DropdownItem
                  key={"login"}
                  onPress={() => router.push("/login")}
                >
                  Login
                </DropdownItem>
              ) : (
                <DropdownItem key={"logout"} onPress={handleLogout}>
                  Logout
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        {!user && (
          <NavbarItem className="hidden lg:flex">
            <Button
              onPress={() => router.push("/login")}
              variant="faded"
              className="text-md"
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <HeroLink
              className="w-full"
              color={
                index === 4
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </HeroLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
