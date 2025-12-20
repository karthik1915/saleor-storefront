"use client";

import React from "react";
import {
  Address,
  AddressInput,
  AddressTypeEnum,
  CountryCode,
} from "@/gql/graphql";
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { IconCheck, IconEdit } from "@tabler/icons-react";
import { Maybe } from "graphql/jsutils/Maybe";
import { useForm } from "@tanstack/react-form";
import { useAddress } from "@/lib/hooks/useAddress";

function DefaultShippingAddress({
  defaultShippingAddress,
}: {
  defaultShippingAddress: Maybe<Address> | undefined;
}) {
  const address = defaultShippingAddress;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { accountAddressCreate, accountAddressUpdate } = useAddress();

  const isNewAddress = address === null || address === undefined;
  const addressId = address?.id;

  const form = useForm({
    defaultValues: {
      firstName: address?.firstName,
      lastName: address?.lastName,
      phone: address?.phone,
      streetAddress1: address?.streetAddress1,
      streetAddress2: address?.streetAddress2,
      city: address?.city,
      countryArea: address?.countryArea,
      country: address?.country?.country,
      postalCode: address?.postalCode,
    } as AddressInput,
    onSubmit: async ({ value }) => {
      if (isNewAddress && !addressId) {
        const errors = await accountAddressCreate({
          address: {
            ...value,
            country: CountryCode.In,
          },
          type: AddressTypeEnum.Shipping,
        });
        if (errors && errors.length > 0) {
          errors.map((err) => {
            addToast({
              title: err.field,
              description: err.message,
              color: "warning",
            });
          });
        } else {
          addToast({
            title: "Created Successfully",
            description: "Your Shipping Address is created successfully!",
            color: "success",
          });
        }
        return;
      } else {
        const errors = await accountAddressUpdate({
          id: addressId!,
          address: value,
        });
        if (errors) {
          errors.map((err) => {
            addToast({
              title: err.field,
              description: err.message,
              color: "warning",
            });
          });
          return;
        } else {
          addToast({
            title: "Update Successfully",
            description: "Your Shipping Address is updated successfully!",
            color: "warning",
          });
        }
      }
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between max-w-lg mb-4">
        <h2 className="text-2xl font-semibold ">Default Shipping Address</h2>
        {true && (
          <div className="flex items-center justify-center gap-2">
            <Button
              isIconOnly
              size="sm"
              title="save"
              variant="solid"
              color="success"
              onPress={onOpen}
            >
              <IconCheck />
            </Button>
            <Modal isOpen={isOpen}>
              <ModalContent>
                <ModalHeader>Are You Sure?</ModalHeader>
                <ModalBody>
                  Are You sure you want to update your default shipping address?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      form.handleSubmit();
                      onClose();
                    }}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button variant="bordered" isIconOnly size="sm" title="Edit">
              <IconEdit className="size-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-4 max-w-lg">
        {/* Name Fields */}
        <div className="flex gap-4 items-center">
          <form.Field
            name="firstName"
            children={(field) => (
              <Input
                className="flex-1"
                label="First Name"
                variant="bordered"
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <form.Field
            name="lastName"
            children={(field) => (
              <Input
                className="flex-1"
                label="Last Name"
                variant="bordered"
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
        </div>

        {/* Rest of Address Fields */}
        <form.Field
          name="phone"
          children={(field) => (
            <Input
              label="Phone"
              variant="bordered"
              value={field.state.value ?? ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <form.Field
          name="streetAddress1"
          children={(field) => (
            <Input
              label="Address street 1"
              variant="bordered"
              value={field.state.value ?? ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <form.Field
          name="streetAddress2"
          children={(field) => (
            <Input
              label="Address street 2"
              variant="bordered"
              value={field.state.value ?? ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <div className="flex gap-4 items-center">
          <form.Field
            name="city"
            children={(field) => (
              <Input
                label="City"
                variant="bordered"
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <form.Field
            name="countryArea"
            children={(field) => (
              <Input
                label="State"
                variant="bordered"
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
        </div>

        <div className="flex gap-4 items-center">
          <form.Field
            name="postalCode"
            children={(field) => (
              <Input
                label="Postal Code"
                variant="bordered"
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <form.Field
            name="country"
            children={(field) => (
              <Select
                label="Country"
                variant="bordered"
                selectedKeys={new Set([field.state.value ?? CountryCode.In])}
                onSelectionChange={(keys) =>
                  field.handleChange([...keys][0] as CountryCode)
                }
              >
                {Object.values(CountryCode).map((code) => (
                  <SelectItem key={code}>{code}</SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default DefaultShippingAddress;
