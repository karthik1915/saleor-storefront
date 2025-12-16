"use client";

import React from "react";
import { Input } from "@heroui/react";
import { Address, Maybe } from "@/gql/graphql";

function AddressForm({ address }: { address: Maybe<Address> | undefined }) {
  return (
    <div className="space-y-4 max-w-lg">
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
    </div>
  );
}

export default AddressForm;
