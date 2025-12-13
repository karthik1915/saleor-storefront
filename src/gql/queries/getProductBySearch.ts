import { gql } from "@apollo/client";

export const getProductBySearch = gql(`
    query SearchProducts($searchString: String!, $first: Int!,$after: String) {
      products(
        channel: "default-channel"
        first: $first
        after: $after
        filter: {}
        search: $searchString
      ) {
        edges {
          node {
            id
            name
            slug
            media {
              id
              alt
              url
            }
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                    currency
                  }
                }
              }
            }
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `);
