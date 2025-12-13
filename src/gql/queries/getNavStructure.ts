import { gql } from "@apollo/client";

export const getNavStructure = gql`
  query navbar {
    menu(slug: "navbar", channel: "default-channel") {
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
          category {
            slug
          }
          level
        }
      }
    }
  }
`;
