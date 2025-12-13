import React from "react";
import ProductsPage from "./ProductsPage";

async function ProductsPageSSR({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const sp = await searchParams;
  return (
    <main className="container mx-auto">
      <h1 className="text-center text-3xl font-bold my-6">Products Page</h1>
      <ProductsPage sp={sp} />
    </main>
  );
}

export default ProductsPageSSR;
