"use client";

import { gql } from "@apollo/client";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import {
  CheckoutCreate,
  CheckoutLinesAdd,
  CheckoutLinesDelete,
  CheckoutCountableConnection,
} from "@/gql/graphql";

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
  const [updateCheckoutLine] = useMutation<{
    checkoutLinesUpdate: CheckoutLinesAdd;
  }>(checkoutLineUpdateMutation);

  const addItemToCart = async (variantId: string | undefined) => {
    if (!variantId) throw new Error("Invalid product variant.");

    const { data } = await fetchUserCheckouts();

    if (data!.me === null)
      throw new Error("Please login to add items to cart.");

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

    return res.data?.checkoutLinesDelete.checkout;
  };

  const increaseCartItem = async (variantId: string | undefined) => {
    return addItemToCart(variantId);
  };

  const decreaseCartItem = async (lineId: string) => {
    const { data } = await fetchUserCheckouts();
    const checkout = data?.me.checkouts.edges[0]?.node;
    const checkoutId = checkout!.id;

    const line = checkout?.lines.find((l) => l.id === lineId);
    if (!line) throw new Error("Line item not found in checkout.");

    const newQuantity = line.quantity - 1;
    if (newQuantity < 1) {
      return deleteItemFromCart([lineId]);
    }
    console.table({ newQuantity, lineId, checkoutId });

    const res = await updateCheckoutLine({
      variables: { checkoutId, lineId, quantity: newQuantity },
    });
    return res.data?.checkoutLinesUpdate.checkout?.lines;
  };

  return {
    addItemToCart,
    deleteItemFromCart,
    increaseCartItem,
    decreaseCartItem,
  };
}

const getAllCheckoutsOfCurrUser = gql`
  query myCheckouts {
    me {
      checkouts(first: 1) {
        edges {
          node {
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
          }
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
          }
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
      }
    }
  }
`;

const deleteCheckoutLineMutation = gql`
  mutation deleteCheckout($checkoutId: ID!, $lineIds: [ID!]!) {
    checkoutLinesDelete(id: $checkoutId, linesIds: $lineIds) {
      checkout {
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
      errors {
        field
        message
        code
      }
    }
  }
`;

const checkoutLineUpdateMutation = gql`
  mutation updateCheckoutLine($checkoutId: ID!, $lineId: ID!, $quantity: Int!) {
    checkoutLinesUpdate(
      checkoutId: $checkoutId
      lines: [{ lineId: $lineId, quantity: $quantity }]
    ) {
      checkout {
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
          variant {
            id
          }
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
      }
      errors {
        field
        message
        code
      }
    }
  }
`;
