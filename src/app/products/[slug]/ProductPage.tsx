"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client/react";
import { Product } from "@/gql/graphql";
import { addToast, Button } from "@heroui/react";
import { useCart } from "@/lib/hooks/useCart";
import { parseDescriptionJson } from "@/utils/description_json_parser";
import { getProductBySlug } from "@/gql/queries/getProductBySlug";

function ProductPage({ productSlug }: { productSlug: string }) {
  const {
    data: productData,
    loading: productLoading,
    // error: productError,
  } = useQuery<{ product: Product }>(getProductBySlug, {
    variables: { slug: productSlug },
  });

  const product = productData?.product;

  return (
    <main className="container mx-auto my-6">
      {productLoading ? (
        <p>Loading product...</p>
      ) : !product ? (
        <p>Product Not Found</p>
      ) : (
        <ProductDetails product={product} />
      )}
    </main>
  );
}

const ProductDetails = ({ product }: { product: Product }) => {
  const { addItemToCart } = useCart();

  const productType = product.productType?.name;
  const desc = parseDescriptionJson(product.description || "");

  const handleAddToCart = async () => {
    // Implement add to cart functionality here
    try {
      await addItemToCart(product.defaultVariant?.id);
      addToast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
        color: "success",
      });
    } catch (err: unknown) {
      addToast({
        title: "Guest User",
        description: (err as Error).message,
        color: "warning",
      });
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl font-semibold">{product.name}</h1>
      <span>{productType}</span>

      <p className="text-center" dangerouslySetInnerHTML={{ __html: desc }} />

      <div className="grid grid-cols-2 gap-4 items-center">
        <Image
          src={product.media?.[0]?.url ?? "/placeholder.png"}
          alt={product.media?.[0]?.alt ?? product.name}
          width={500}
          height={500}
        />
        <div>
          <span></span>
          <h2 className="text-lg font-medium mb-2">Variants:</h2>
          <ul>
            {product.productVariants?.edges.map((node) => (
              <li key={node?.node.id}>{node?.node.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 ">
        <p>
          {product.defaultVariant?.pricing?.price?.gross.amount}&nbsp;
          {product.defaultVariant?.pricing?.price?.gross.currency}
        </p>
        <div>
          <Button color="primary" onPress={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
