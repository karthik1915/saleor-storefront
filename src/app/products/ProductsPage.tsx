"use client";

import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Input, Pagination, Skeleton } from "@heroui/react";
import { useLazyQuery } from "@apollo/client/react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { Product, ProductCountableConnection } from "@/gql/graphql";
import { getProductBySearch } from "@/gql/queries/getProductBySearch";

function ProductsPage({ sp }: { sp: { [key: string]: string } }) {
  const router = useRouter();

  const PAGE_SIZE = 8;
  const queryFromUrl = sp["q"] ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [runQuery, { loading }] = useLazyQuery<{
    products: ProductCountableConnection;
  }>(getProductBySearch);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const fetchPage = (page: number, search: string) => {
    const after = pageCursors[page - 1] ?? null;

    runQuery({
      variables: {
        searchString: search,
        first: PAGE_SIZE,
        after,
      },
    }).then((res) => {
      const connection = res.data?.products;
      const edges = connection?.edges ?? [];
      const pageInfo = connection?.pageInfo;

      setProducts(edges.map((e) => e.node));
      setTotalCount(connection?.totalCount ?? 0);

      setPageCursors((prev) => {
        if (prev[page]) return prev;
        return [...prev, pageInfo?.endCursor ?? null];
      });
    });
  };

  useEffect(() => {
    fetchPage(1, queryFromUrl);
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        router.replace(value ? `?q=${encodeURIComponent(value)}` : "?q=");

        setCurrentPage(1);
        setPageCursors([null]);

        fetchPage(1, value);
      }, 500),
    [router]
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchPage(page, queryFromUrl);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <div className="max-w-sm mx-auto">
        <Input
          placeholder="Search products..."
          defaultValue={queryFromUrl}
          onChange={handleChange}
        />
      </div>

      <div className="my-4 flex items-center justify-center flex-wrap gap-4">
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton key={i} className="w-82 h-[296px] rounded-2xl" />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      <div className="flex items-center justify-center my-6">
        {!loading && totalPages > 1 && (
          <Pagination
            showShadow
            showControls
            variant="faded"
            page={currentPage}
            total={totalPages}
            onChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
