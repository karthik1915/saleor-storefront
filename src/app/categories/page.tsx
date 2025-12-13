"use client";

import React from "react";
import { gql } from "@apollo/client";
import { CategoryCountableConnection } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";
import { Button } from "@heroui/react";
import Link from "next/link";

const getAllCategories = gql(`query categories {
  categories(first: 100) {
    edges {
      node {
        id
        name
        slug
        children(first: 10) {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
}`);

function CategoriesPage() {
  const { data, loading } = useQuery<{
    categories: CategoryCountableConnection;
  }>(getAllCategories);

  return (
    <main className="mx-auto my-6">
      <h1 className="text-center font-semibold text-2xl">Categories</h1>

      {loading ? (
        <p className="text-center my-4">Loading categories...</p>
      ) : (
        data?.categories.edges.map(({ node }) => (
          <div
            key={node.id}
            className="border p-4 my-4 mx-8 rounded-lg shadow-sm"
          >
            <Link
              href={`/categories/${node.slug}`}
              className="font-medium text-xl"
            >
              {node.name}
            </Link>
            {node.children?.edges.length === 0 ? (
              <p className="text-gray-500 mt-2">No subcategories available.</p>
            ) : (
              <div className="flex items-center gap-4 mt-2">
                {node.children?.edges.map(({ node: child }) => (
                  <Button
                    color="secondary"
                    key={child.id}
                    className="font-medium text-lg "
                  >
                    {child.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </main>
  );
}

export default CategoriesPage;
