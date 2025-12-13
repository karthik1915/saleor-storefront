import React from "react";
import { Menu } from "@/gql/graphql";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarContent,
  NavbarItem,
  Skeleton,
} from "@heroui/react";
import Link from "next/link";

function NavDropDown({
  menu,
  loading,
}: {
  menu:
    | {
        menu: Menu;
      }
    | undefined;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-4">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-6 w-26 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-6 w-26 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-6 w-26 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    );
  }
  const topMenuItems = menu?.menu.items || [];
  return (
    <NavbarContent className="flex items-center gap-4" justify="center">
      {topMenuItems.map((item) => (
        <Dropdown key={item.id}>
          <NavbarItem>
            <DropdownTrigger className="cursor-pointer">
              {item.name}
            </DropdownTrigger>
          </NavbarItem>
          {item.children && item.children.length > 0 ? (
            <DropdownMenu variant="faded">
              {item.children.map((child) => (
                <DropdownItem
                  key={child.id}
                  as={Link}
                  href={`/categories/${child.category?.slug}`}
                >
                  {child.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          ) : null}
        </Dropdown>
      ))}
    </NavbarContent>
  );
}

export default NavDropDown;
