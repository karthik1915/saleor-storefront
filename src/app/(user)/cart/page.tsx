import React from "react";
import CartPage from "./components/cartPage";

function CartPageSSR() {
  return (
    <main className="mx-auto container my-8">
      <h1 className="text-4xl font-semibold">Your Cart</h1>
      <CartPage />
    </main>
  );
}

export default CartPageSSR;
