"use client";

import { useEffect } from "react";
import { User } from "@/gql/graphql";
import { gql } from "@apollo/client";
import { useUserStore } from "@/store";
import { useQuery } from "@apollo/client/react";

const USER_QUERY = gql`
  query me {
    me {
      firstName
      email
      lastName
      avatar {
        alt
        url
      }
      checkouts(first: 1) {
        edges {
          node {
            id
            lines {
              id
              variant {
                id
                name
                product {
                  id
                  name
                  slug
                  thumbnail {
                    url
                    alt
                  }
                }
              }
              quantity
              unitPrice {
                gross {
                  amount
                }
              }
              totalPrice {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function UserFetcher() {
  const { data, loading } = useQuery<{ me: User }>(USER_QUERY, {
    fetchPolicy: "network-only",
  });

  console.log(data);

  const setUser = useUserStore((s) => s.setUser);
  const setLines = useUserStore((s) => s.setLines);

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
      const lines = data.me.checkouts?.edges?.[0]?.node?.lines ?? [];
      setLines(lines);
    }
  }, [data, loading]);

  return null;
}
