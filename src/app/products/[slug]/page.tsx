import React from "react";
import ProductPage from "./ProductPage";

async function ProductPageSSR({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="container mx-auto">
      <ProductPage productSlug={slug} />
    </main>
  );
}

export default ProductPageSSR;
