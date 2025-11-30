"use client";

import React from "react";
import { gql } from "@apollo/client";
import { Category, ProductCountableConnection } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

const getCategoryDetails = gql(`
  query CategoryDetails($slug: String!) {
    category(slug: $slug) {
      id
      name
      description
      children(first: 10) {
        edges {
          node {
            id
            name
            slug
            products(first: 10, channel: "default-channel") {
              edges {
                node {
                  id
                  slug
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`);

const getCategoryProducts = gql(`
query categoryProducts($id: ID!) {
  products(
    first: 20
    channel: "default-channel"
    where: {category: {eq: $id}}
  ) {
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
`);

function CategoryDetailsPage({ categorySlug }: { categorySlug: string }) {
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<{ category: Category }>(getCategoryDetails, {
    variables: {
      slug: categorySlug,
    },
  });

  const category = categoryData?.category!;

  if (!categoryData && !categoryLoading) {
    return <p className="text-center my-4">No category found.</p>;
  }

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useQuery<{ products: ProductCountableConnection }>(getCategoryProducts, {
    variables: {
      id: categoryData?.category.id,
    },
  });

  return (
    <>
      {categoryLoading ? (
        <p className="text-center my-4">Loading category details...</p>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-center my-6">
            {category.name}
          </h1>
          <section className="my-6">
            <h2 className="font-semibold text-xl">Products</h2>
            {productsLoading ? (
              <p className="text-center my-4">Loading products...</p>
            ) : productsData?.products.edges.length === 0 ? (
              <p className="text-gray-500 mt-2">No products available.</p>
            ) : (
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                {productsData?.products.edges.map(({ node }) => (
                  <ProductCard key={node.id} product={node} />
                ))}
              </div>
            )}
          </section>
          <section className="my-6">
            <h2 className="font-semibold text-xl">Sub Categories</h2>
            {category.children?.edges.length === 0 ? (
              <p className="text-gray-500 mt-2">No subcategories available.</p>
            ) : (
              <div className="flex items-center gap-4 mt-4">
                {category.children?.edges.map(({ node }) => (
                  <Link
                    href={`/categories/${node.slug}`}
                    key={node.name}
                    className="p-8 border-2 border-violet-500 rounded-sm"
                  >
                    {node.name}
                  </Link>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}

export default CategoryDetailsPage;
