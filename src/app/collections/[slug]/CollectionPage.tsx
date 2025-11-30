"use client";

import React from "react";
import { gql } from "@apollo/client";
import { Collection } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";
import { parseDescriptionJson } from "@/utils/description_json_parser";
import ProductCard from "@/components/product/ProductCard";

const getCollectionProducts = gql(`
query collection($slug: String!) {
  collection(slug: $slug, channel: "default-channel") {
    id
    name
    description
    products(first: 10) {
      edges {
        node {
          id
          name
          slug
          defaultVariant {
            id
            name
            pricing {
              price {
                gross {
                  currency
                  amount
                }
              }
            }
          }
          description
          productType {
            id
            name
          }
          rating
          media {
            id
            alt
            url
          }
          thumbnail {
            url
            alt
          }
        }
      }
    }
  }
}
`);

function CollectionPage({ collectionSlug }: { collectionSlug: string }) {
  const {
    data: collectionData,
    loading: collectionLoading,
    error: collectionError,
  } = useQuery<{ collection: Collection }>(getCollectionProducts, {
    variables: { slug: collectionSlug },
  });

  if (!collectionData && !collectionLoading) {
    return <p className="text-center my-4">No collection found.</p>;
  }

  const collection = collectionData?.collection;
  const desc = parseDescriptionJson(collection?.description);

  return (
    <>
      {collectionLoading ? (
        <p className="text-center my-4">Loading collection...</p>
      ) : !collection ? (
        <p className="text-center my-4">No collection found.</p>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-center ">
            {collection.name}
          </h1>
          <p
            dangerouslySetInnerHTML={{ __html: desc }}
            className="text-center"
          />

          <section className="my-6">
            <h2 className="text-xl font-semibold mb-4">
              Product Included in this collection
            </h2>

            {collection.products?.edges.length === 0 ? (
              <p className="text-center my-4">
                No products found in this collection.
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                {collection.products?.edges.map(({ node }) => (
                  <ProductCard key={node.id} product={node} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}

export default CollectionPage;
