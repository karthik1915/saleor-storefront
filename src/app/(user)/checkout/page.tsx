import React from "react";
import CartTable from "./CartTable";

function CheckoutPage() {
  return (
    <main className="mx-auto container my-6">
      <h1 className="text-2xl font-semibold text-center">Checkout</h1>
      <div className="mx-auto max-w-3xl my-4">
        <CartTable />
      </div>
    </main>
  );
}

export default CheckoutPage;
