import React from "react";
import CollectionPage from "./CollectionPage";

async function CollectionPageSSR({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="mx-auto container my-6">
      <CollectionPage collectionSlug={slug} />
    </main>
  );
}

export default CollectionPageSSR;
