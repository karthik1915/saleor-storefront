"use client";

import React from "react";
import Image from "next/image";
import { useUserStore } from "@/store";
import { CheckoutLine } from "@/gql/graphql";
import { Button, ButtonGroup } from "@heroui/react";
import { IconTrash } from "@tabler/icons-react";
import { useCart } from "@/lib/hooks/useCart";
import CalculatedPrice from "@/components/product/CalculatedPrice";

function CartItems({ disableEditing = false }: { disableEditing?: boolean }) {
  const checkoutLines = useUserStore((state) => state.lines);

  return (
    <div className="flex flex-col w-full">
      {checkoutLines.map((line, idx) => (
        <CartItemCart
          key={line.id}
          disableEditing={disableEditing}
          item={line}
          isLast={idx === checkoutLines.length - 1}
        />
      ))}
    </div>
  );
}

const CartItemCart = ({
  item,
  disableEditing,
  isLast,
}: {
  item: CheckoutLine;
  disableEditing: boolean;
  isLast: boolean;
}) => {
  const { increaseCartItem, decreaseCartItem } = useCart();

  return (
    <div
      className={`w-full py-4 flex gap-4 ${
        isLast ? "" : "border-b border-neutral-300"
      }`}
    >
      <Image
        src={item.variant.product.thumbnail?.url!}
        alt={item.variant.product.thumbnail?.alt!}
        width={120}
        height={120}
        className="object-cover rounded-lg"
      />

      <div className="flex flex-1 items-center justify-between gap-6">
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-medium">{item.variant.product.name}</h3>
          <p className="text-sm text-gray-600">
            Variant:{" "}
            {item.variant.name === item.variant.id
              ? "Default"
              : item.variant.name}
          </p>
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-2xl font-semibold mt-3">
            <CalculatedPrice
              price={item.undiscountedTotalPrice.amount}
              discountedPrice={item.totalPrice.gross.amount}
            />
            $
          </p>
        </div>
        {disableEditing ? (
          <div className="flex flex-col items-end gap-4">
            <Button color="danger" variant="flat" isIconOnly>
              <IconTrash size={18} />
            </Button>

            <ButtonGroup>
              <Button
                variant="bordered"
                size="sm"
                onPress={() => decreaseCartItem(item.id)}
              >
                -
              </Button>
              <Button
                disableRipple
                disableAnimation
                variant="bordered"
                size="sm"
              >
                {item.quantity}
              </Button>
              <Button
                variant="bordered"
                size="sm"
                onPress={() => increaseCartItem(item.variant.id)}
              >
                +
              </Button>
            </ButtonGroup>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CartItems;
