"use client";

import React from "react";
import { useUserStore } from "@/store";

function CurrentOrders() {
  const cartItems = useUserStore((state) => state.lines);

  return <div>CurrentOrders</div>;
}

export default CurrentOrders;
