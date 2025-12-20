"use client";

import React from "react";

function CalculatedPrice({
  price,
  discountedPrice,
  discountAmount,
}: {
  price: number;
  discountedPrice?: number;
  discountAmount?: number;
}) {
  if (discountedPrice === price && !discountAmount) {
    return <span>{price}</span>;
  }
  return (
    <span>
      <s className="mr-2 text-sm">{price}</s>
      {discountedPrice}
    </span>
  );
}

export default CalculatedPrice;
