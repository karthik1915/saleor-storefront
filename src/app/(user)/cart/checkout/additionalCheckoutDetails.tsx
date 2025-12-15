"use client";

import { useUserStore } from "@/store";
import { Input, Skeleton } from "@heroui/react";
import React from "react";

function AdditionalCheckoutDetails() {
  const checkoutData = useUserStore((state) => state.checkoutData);
  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <Input placeholder="Coupon Code or Gift Card" disabled />
      </div>
      <table className="w-full border-separate border-spacing-y-4 p-4 text-lg">
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
            <td className="text-gray-600">Shipping Cost</td>
            <td className="text-right font-medium">
              {checkoutData?.totalPrice?.gross?.amount === undefined ? (
                <Skeleton className="w-12 h-6 float-end rounded-lg" />
              ) : (
                "$" + 0.0
              )}
            </td>
          </tr>
          <tr>
            <td className="text-gray-600 font-semibold">Total</td>
            <td className="text-right font-medium">
              {checkoutData?.totalPrice?.gross?.amount === undefined ? (
                <Skeleton className="w-12 h-6 float-end rounded-lg" />
              ) : (
                "$" + checkoutData?.totalPrice?.gross?.amount
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdditionalCheckoutDetails;
