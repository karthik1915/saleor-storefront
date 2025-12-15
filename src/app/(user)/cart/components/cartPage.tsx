"use client";

import React from "react";
import { Card } from "@heroui/react";
import OrderSummary from "./orderSummary";
import CartItems from "./cartItems";

function CartPage() {
  return (
    <div className="grid grid-cols-[1fr_0.5fr] my-6 gap-6 items-start">
      <Card className="p-6" shadow="none">
        <CartItems disableEditing />
      </Card>
      <Card className="p-6" shadow="none">
        <OrderSummary />
      </Card>
    </div>
  );
}

export default CartPage;
