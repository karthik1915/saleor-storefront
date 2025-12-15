import { gql } from "@apollo/client";

export const getCheckoutData = gql`
  query checkout($id: ID!) {
    checkout(id: $id) {
      id
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
        quantity
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
      }
      billingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          country
        }
        countryArea
      }
      shippingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          country
        }
        countryArea
      }
      shippingMethods {
        id
        name
        description
        minimumDeliveryDays
        maximumDeliveryDays
        price {
          amount
        }
      }
    }
  }
`;
