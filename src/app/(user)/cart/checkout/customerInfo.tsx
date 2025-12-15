"use client";

import React from "react";
import {
  RadioGroup,
  Checkbox,
  Button,
  cn,
  VisuallyHidden,
  useRadio,
} from "@heroui/react";
import { Input } from "@heroui/react";
import { useUserStore } from "@/store";
import { useQuery } from "@apollo/client/react";
import { Checkout } from "@/gql/graphql";
import { getCheckoutData } from "@/gql/queries/getCheckoutData";
import { c } from "@apollo/client/react/internal/compiler-runtime";

function CustomerInfo() {
  const userData = useUserStore((state) => state.user);
  const userCheckoutData = useUserStore((state) => state.checkoutData);
  const { data: checkoutData, loading: checkoutLoading } = useQuery<{
    checkout: Checkout;
  }>(getCheckoutData, {
    variables: {
      id: userCheckoutData?.id,
    },
  });

  if (!userData || checkoutLoading) {
    return <div>Loading...</div>;
  }
  console.log("checkoutData in CustomerInfo:", checkoutData);

  // Extract checkout shipping address (if checkout exists)
  const checkoutAddress = checkoutData?.checkout.shippingAddress || null;

  // Extract default user shipping address
  const defaultUserAddress = userData.defaultShippingAddress || null;

  // FINAL ADDRESS (priority: checkout > default user address)
  const address = checkoutAddress || defaultUserAddress;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Customer Information</h2>

      {/* User Email */}
      <Input label="User Email" variant="bordered" value={userData.email} />

      {/* Shipping Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <div className="text-sm text-neutral-700">
          <Checkbox id="default-address-check" size="sm">
            Save as default shipping address
          </Checkbox>
        </div>
      </div>

      {/* Name Fields */}
      <div className="flex gap-4 items-center">
        <Input
          className="flex-1"
          label="First Name"
          variant="bordered"
          value={address?.firstName || ""}
        />
        <Input
          className="flex-1"
          label="Last Name"
          variant="bordered"
          value={address?.lastName || ""}
        />
      </div>

      {/* Rest of Address Fields */}
      <Input label="Phone" variant="bordered" value={address?.phone || ""} />
      <Input
        label="Address Line 1"
        variant="bordered"
        value={address?.streetAddress1 || ""}
      />
      <Input
        label="Address Line 2"
        variant="bordered"
        value={address?.streetAddress2 || ""}
      />

      <div className="flex gap-4 items-center">
        <Input
          className="flex-1"
          label="City"
          variant="bordered"
          value={address?.city || ""}
        />
        <Input
          className="flex-1"
          label="State"
          variant="bordered"
          value={address?.countryArea || ""}
        />
      </div>

      <div className="flex gap-4 items-center">
        <Input
          className="flex-1"
          label="Country"
          variant="bordered"
          value={address?.country?.country || ""}
        />
        <Input
          className="flex-1"
          label="Postal Code"
          variant="bordered"
          value={address?.postalCode || ""}
        />
      </div>

      <h2 className="text-xl font-semibold">Shipping Method</h2>
      <RadioGroup label="Plans" value={"delivery"}>
        <CustomRadio description="Takes 2-3 business days" value="delivery">
          Home Delivery
        </CustomRadio>
        <CustomRadio description="Pick from store location" value="pickup">
          In Store Pickup
        </CustomRadio>
      </RadioGroup>

      <Button className="mt-4 h-12 text-lg" color="primary" fullWidth>
        Continue to Payment
      </Button>
    </div>
  );
}

// Custom Radio Component remains unchanged
export const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};

export default CustomerInfo;
