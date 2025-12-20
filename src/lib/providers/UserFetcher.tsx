"use client";

import { useEffect } from "react";
import { User } from "@/gql/graphql";
import { gql } from "@apollo/client";
import { useUserStore } from "@/store";
import { useQuery } from "@apollo/client/react";

const USER_QUERY = gql`
  query me {
    me {
      id
      firstName
      email
      lastName
      avatar {
        alt
        url
      }
      metadata {
        key
        value
      }
      checkouts(first: 1) {
        edges {
          node {
            id
            voucher {
              name
              discountValue
              discountValueType
            }
            voucherCode
            discount {
              amount
            }
            totalPrice {
              gross {
                amount
              }
              net {
                amount
              }
              tax {
                amount
              }
            }
            lines {
              id
              variant {
                id
                name
                pricing {
                  price {
                    gross {
                      amount
                    }
                  }
                }
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
              undiscountedTotalPrice {
                amount
              }
            }
          }
        }
      }
      defaultShippingAddress {
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        cityArea
        country {
          code
          country
        }
        countryArea
        postalCode
        isDefaultBillingAddress
        isDefaultShippingAddress
      }
      defaultBillingAddress {
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        cityArea
        country {
          code
          country
        }
        countryArea
        postalCode
        isDefaultBillingAddress
        isDefaultShippingAddress
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
  const setCheckoutData = useUserStore((s) => s.setCheckoutData);
  const setLines = useUserStore((s) => s.setLines);

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
      const checkout = data.me.checkouts?.edges?.[0]?.node;
      const lines = checkout?.lines ?? [];
      if (checkout) {
        const { lines: _, ...checkoutWithoutLines } = checkout;
        setCheckoutData(checkoutWithoutLines);
      } else {
        setCheckoutData(null);
      }
      setLines(lines);
    }
  }, [data, loading, setLines, setUser]);

  return null;
}
