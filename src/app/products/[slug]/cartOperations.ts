"use client";

import { gql } from "@apollo/client";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import {
  CheckoutCountableConnection,
  CheckoutCreate,
  CheckoutLinesAdd,
  CheckoutLinesDelete,
} from "@/gql/graphql";
import { addToast } from "@heroui/react";

export function useCart() {
  const [fetchUserCheckouts] = useLazyQuery<{
    me: { checkouts: CheckoutCountableConnection };
  }>(getAllCheckoutsOfCurrUser);

  const [createCheckout] = useMutation<{ checkoutCreate: CheckoutCreate }>(
    createCheckoutMutation
  );
  const [addCheckoutLine] = useMutation<{ checkoutLinesAdd: CheckoutLinesAdd }>(
    addCheckoutLineMutation
  );
  const [deleteCheckoutLine] = useMutation<{
    checkoutLinesDelete: CheckoutLinesDelete;
  }>(deleteCheckoutLineMutation);

  const addItemToCart = async (variantId: string) => {
    const { data } = await fetchUserCheckouts();
    const checkout = data?.me.checkouts.edges[0]?.node;

    if (!checkout) {
      const res = await createCheckout({
        variables: { variantId },
      });
      return res.data?.checkoutCreate.checkout?.lines;
    }

    const checkoutId = checkout.id;

    const res = await addCheckoutLine({
      variables: { checkoutId, variantId },
    });

    return res.data?.checkoutLinesAdd.checkout?.lines;
  };

  const deleteItemFromCart = async (lineIds: string[]) => {
    const { data } = await fetchUserCheckouts();
    const checkout = data?.me.checkouts.edges[0]?.node;

    const checkoutId = checkout!.id;

    const res = await deleteCheckoutLine({
      variables: { checkoutId, lineIds },
    });

    return res.data?.checkoutLinesDelete.checkout?.id;
  };

  return { addItemToCart, deleteItemFromCart };
}

const getAllCheckoutsOfCurrUser = gql`
  query myCheckouts {
    me {
      checkouts(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

const createCheckoutMutation = gql`
  mutation createCheckout($variantId: ID!) {
    checkoutCreate(
      input: {
        channel: "default-channel"
        lines: [{ variantId: $variantId, quantity: 1 }]
      }
    ) {
      checkout {
        id
        lines {
          id
          variant {
            id
          }
          quantity
          totalPrice {
            gross {
              amount
            }
          }
        }
      }
    }
  }
`;

const addCheckoutLineMutation = gql`
  mutation addCheckoutLine($checkoutId: ID!, $variantId: ID!) {
    checkoutLinesAdd(
      checkoutId: $checkoutId
      lines: [{ variantId: $variantId, quantity: 1 }]
    ) {
      checkout {
        id
        lines {
          id
          variant {
            id
          }
          quantity
          totalPrice {
            gross {
              amount
            }
          }
        }
      }
    }
  }
`;

const deleteCheckoutLineMutation = gql`
  mutation deleteCheckout($checkoutId: ID!, $lineIds: [ID!]!) {
    checkoutLinesDelete(id: $checkoutId, linesIds: $lineIds) {
      checkout {
        id
      }
      errors {
        field
        message
        code
      }
    }
  }
`;
