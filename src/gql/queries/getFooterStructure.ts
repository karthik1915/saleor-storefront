import { gql } from "@apollo/client";

export const getFooterStructure = gql`
  query structures {
    menu(slug: "footer", channel: "default-channel") {
      id
      name
      slug
      items {
        id
        name
        level
        children {
          id
          name
          level
          url
          collection {
            slug
          }
          page {
            slug
          }
        }
      }
    }
  }
`;
