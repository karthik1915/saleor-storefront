"use client";

import React from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import { CollectionCountableConnection } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

const getAllCollections = gql(`
  query collections {
    collections(first: 10, channel: "default-channel") {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`);

function CollectionsPage() {
  const { data, loading, error } = useQuery<{
    collections: CollectionCountableConnection;
  }>(getAllCollections);

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <main className="mx-auto my-6 container">
      <h1 className="text-center font-semibold text-2xl">Collections</h1>
      {loading ? (
        <p className="text-center my-4">Loading collections...</p>
      ) : (
        data?.collections.edges.map(({ node }) => (
          <div
            key={node.id}
            className="border p-4 my-4 mx-8 rounded-lg shadow-sm"
          >
            <Link
              href={`/collections/${node.slug}`}
              className="font-medium text-xl"
            >
              {node.name}
            </Link>
          </div>
        ))
      )}
    </main>
  );
}

export default CollectionsPage;
