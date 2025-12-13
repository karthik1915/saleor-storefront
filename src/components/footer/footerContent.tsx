"use client";

import React from "react";
import { Menu } from "@/gql/graphql";
import { getFooterStructure } from "@/gql/queries/getFooterStructure";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";

function FooterContent() {
  const { data, loading } = useQuery<{ menu: Menu }>(getFooterStructure, {
    fetchPolicy: "cache-first",
  });
  if (loading && !data?.menu) return <div>Loading footer...</div>;
  const footerData = data?.menu;

  if (!footerData) return <div>No footer data</div>;

  return (
    <div className="flex items-center justify-start gap-6 mb-4">
      {footerData.items?.map((item) => (
        <div key={item.id} className="flex flex-col">
          <h4 className="font-semibold mb-2">{item.name}</h4>
          <ul>
            {item.children?.map((child) => (
              <li key={child.id} className="mb-1">
                <Link
                  href={getStructureLink(child)}
                  className="text-sm text-neutral-700 "
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const getStructureLink = (item: any): string => {
  if (item.url) return item.url;
  if (item.collection) return `/collections/${item.collection.slug}`;
  if (item.page) return `/${item.page.slug}`;
  return "#";
};
export default FooterContent;
