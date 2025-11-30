import React from "react";
import CategoryDetailsPage from "./CategoryDetailsPage";

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="mx-auto container">
      <CategoryDetailsPage categorySlug={slug} />
    </main>
  );
}

export default CategoryPage;
