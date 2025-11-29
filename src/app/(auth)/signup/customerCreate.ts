import { gql } from "@apollo/client";

export const CUSTOMER_CREATE = gql`
  mutation customerCreate($input: UserCreateInput!) {
    customerCreate(input: $input) {
      user {
        id
        email
      }
      errors {
        field
        message
        code
      }
    }
  }
`;
