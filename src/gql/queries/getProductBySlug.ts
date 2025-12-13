import { gql } from "@apollo/client";

export const getProductBySlug = gql(`
query product($slug: String!) {
  product(slug: $slug, channel: "default-channel") {
    id
    name
    slug
    description
    defaultVariant {
      id
      pricing {
        price {
          gross {
            currency
            amount
          }
        }
      }
    }
    productVariants(first: 10) {
      edges {
        node {
          id
          name
          quantityAvailable
          pricing {
            price {
              gross {
                currency
                amount
              }
            }
          }
        }
      }
    }
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
`);
