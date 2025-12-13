import React from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { Product } from "@/gql/graphql";
import { useRouter } from "next/navigation";

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  return (
    <Card
      isPressable
      shadow="sm"
      className="w-82"
      onPress={() => router.push(`/products/${product.slug}`)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          alt={product.media?.[0]?.alt || product.name}
          className="w-full object-cover h-[296px]"
          src={product.media?.[0]?.url || "/generic-image-placeholder.webp"}
          width={400}
          height={600}
        />
      </CardBody>
      <CardFooter className="text-small justify-between bg-neutral-200">
        <b>{product.name}</b>
        <p className="text-default-500">
          {product.defaultVariant?.pricing?.price?.gross.amount}{" "}
          {product.defaultVariant?.pricing?.price?.gross.currency}
        </p>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
