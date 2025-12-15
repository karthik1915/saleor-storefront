import React from "react";
import CustomerInfo from "./customerInfo";
import CartItems from "../components/cartItems";
import AdditionalCheckoutDetails from "./additionalCheckoutDetails";

function CheckoutPage() {
  return (
    <main className="mx-auto container my-6 max-w-5xl px-4">
      <h1 className="text-3xl font-semibold text-center">Checkout</h1>
      <div className="grid grid-cols-2 gap-4 my-8">
        <div>
          <CustomerInfo />
        </div>
        <div>
          <CartItems />
          <AdditionalCheckoutDetails />
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
