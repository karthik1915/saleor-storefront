"use client";

import { useUserStore } from "@/store";
import { Button, Input, Skeleton } from "@heroui/react";
import { IconDiscount } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

function OrderSummary() {
  const checkoutData = useUserStore((state) => state.checkoutData);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Order Summary</h2>

      <table className="w-full border-separate border-spacing-y-4">
        <tbody>
          <tr>
            <td className="text-gray-600">Subtotal</td>
            <td className="text-right font-medium">
              {checkoutData?.totalPrice?.gross?.amount === undefined ? (
                <Skeleton className="w-12 h-6 float-end rounded-lg" />
              ) : (
                "$" + checkoutData?.totalPrice?.gross?.amount
              )}
            </td>
          </tr>

          <tr>
            <td className="text-gray-600">Delivery Fee</td>
            <td className="text-right font-medium">
              {checkoutData?.totalPrice?.gross?.amount === undefined ? (
                <Skeleton className="w-12 h-6 float-end rounded-lg" />
              ) : (
                "$" + 0.0
              )}
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <div className="flex gap-3 w-full">
                <Input
                  className="flex-1"
                  placeholder="Coupon code"
                  startContent={<IconDiscount size={18} />}
                />
                <Button color="success" className="shrink-0">
                  Apply
                </Button>
              </div>
            </td>
          </tr>

          <tr>
            <td className="pt-4 text-lg font-semibold">Total</td>
            <td className="pt-4 text-right text-lg font-semibold">
              {checkoutData?.totalPrice?.gross?.amount === undefined ? (
                <Skeleton className="w-12 h-6 float-end rounded-lg" />
              ) : (
                "$" + checkoutData?.totalPrice?.gross?.amount
              )}
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <Button
                className="w-full h-12 text-base font-semibold"
                color="primary"
                as={Link}
                href="/cart/checkout"
              >
                Checkout
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderSummary;
