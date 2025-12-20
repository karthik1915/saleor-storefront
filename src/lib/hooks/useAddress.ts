"use client";

import {
  AccountAddressCreate,
  AccountAddressUpdate,
  AddressInput,
  AddressTypeEnum,
} from "@/gql/graphql";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

/**
 * Address management hook for Saleor accounts.
 *
 * Responsibilities:
 * - Create user addresses
 * - Update existing addresses
 * - Delete addresses
 * - Set default billing / shipping address
 *
 * Intended usage:
 * const {
 *   createAddress,
 *   updateAddress,
 *   deleteAddress,
 *   setDefaultAddress
 * } = useAddress()
 */
export function useAddress() {
  const [createAddress] = useMutation<{
    accountAddressCreate: AccountAddressCreate;
  }>(accountAddressCreateQuery);
  const [addressUpdate] = useMutation<{
    accountAddressUpdate: AccountAddressUpdate;
  }>(accountAddressUpdateQuery);
  /**
   * Creates a new address for the authenticated user.
   *
   * Expected to call `accountAddressCreate` mutation.
   * Should return created address or mutation result.
   */
  const accountAddressCreate = async ({
    address,
    type,
  }: {
    address: AddressInput;
    type: AddressTypeEnum;
  }) => {
    const response = await createAddress({
      variables: {
        address: address,
        type: type,
      },
    });
    return response.data?.accountAddressCreate.errors;
  };

  /**
   * Deletes an existing user address by ID.
   *
   *
   * Expected to call `accountAddressDelete` mutation.
   */
  const accountAddressDelete = () => {};

  /**
   * Updates an existing address.
   *
   * Only changed fields should be sent to the mutation.
   * Ideal to be used with dirty-form detection.
   */
  const accountAddressUpdate = async ({
    id,
    address,
  }: {
    id: string;
    address: AddressInput;
  }) => {
    const response = await addressUpdate({
      variables: {
        addressId: id,
        address: address,
      },
    });
    return response.data?.accountAddressUpdate.errors;
  };

  /**
   * Sets a default address for billing or shipping.
   *
   * Should support:
   * - DEFAULT_BILLING
   * - DEFAULT_SHIPPING
   */
  const accountSetDefaultAddress = () => {};

  return {
    accountAddressCreate,
    accountAddressDelete,
    accountAddressUpdate,
    accountSetDefaultAddress,
  };
}

const accountAddressCreateQuery = gql`
  mutation addressCreate($address: AddressInput!, $type: AddressTypeEnum!) {
    accountAddressCreate(input: $address, type: $type) {
      errors {
        field
        message
      }
    }
  }
`;
const accountAddressUpdateQuery = gql`
  mutation addressUpdate($addressId: ID!, $address: AddressInput!) {
    accountAddressUpdate(id: $addressId, input: $address) {
      errors {
        field
        message
      }
    }
  }
`;
