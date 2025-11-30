"use client";

import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Product } from "@/gql/graphql";
import Image from "next/image";
import { parseDescriptionJson } from "@/utils/description_json_parser";

const getProductBySlug = gql(`
query product($slug: String!) {
  product(slug: $slug,channel:"default-channel") {
    id
    name
    slug
    description
    productType{
      id
      name
    }
    rating
    media{
      id
      alt
      url
    }
    thumbnail{
      url
      alt
    }
  }
}    
`);

function ProductPage({ productSlug }: { productSlug: string }) {
  const {
    data: productData,
    loading: productLoading,
    error: productError,
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
  const desc = parseDescriptionJson(product.description || "");

  return (
    <>
      <h1 className="text-center text-2xl font-semibold">{product.name}</h1>

      <p className="text-center" dangerouslySetInnerHTML={{ __html: desc }} />

      <Image
        src={product.media?.[0]?.url ?? "/placeholder.png"}
        alt={product.media?.[0]?.alt ?? product.name}
        width={500}
        height={500}
      />
    </>
  );
};

export default ProductPage;
