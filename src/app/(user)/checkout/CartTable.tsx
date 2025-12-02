"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { useUserStore } from "@/store";
import { flatten } from "flat";

const columns = [
  {
    key: "variant.product.name",
    label: "Name",
  },
  {
    key: "variant.name",
    label: "Variant",
  },
  {
    key: "totalPrice.gross.amount",
    label: "Amount",
  },
];

export default function CartTable() {
  const cartItems = useUserStore((state) => state.lines);

  return (
    <Table aria-label="Controlled table example with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={cartItems}>
        {(item) => {
          const flat = flatten(item);
          console.log(flat);
          return (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(flat, columnKey)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}
