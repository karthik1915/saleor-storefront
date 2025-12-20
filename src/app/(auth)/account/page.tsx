"use client";

import React from "react";
import { AccountInput, AccountUpdate } from "@/gql/graphql";
import { useUserStore } from "@/store";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { IconUserEdit } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";

function AccountPage() {
  const userData = useUserStore((state) => state.user);
  const [accountUpdate, { loading: updating }] = useMutation<{
    accountUpdate: AccountUpdate;
  }>(accountUpdateMutation);

  const form = useForm({
    defaultValues: {
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      dob: userData?.metadata.find((m) => m.key === "dob")?.value ?? "",
      gender: userData?.metadata.find((m) => m.key === "gender")?.value ?? "",
      phone: userData?.metadata.find((m) => m.key === "phone")?.value ?? "",
    },
    onSubmit: async ({ value }) => {
      const updateObj: AccountInput = {
        firstName: value.firstName,
        lastName: value.lastName,
        metadata: [
          { key: "dob", value: value.dob },
          { key: "gender", value: value.gender },
          { key: "phone", value: value.phone },
        ],
      };
      const res = await accountUpdate({
        variables: {
          input: updateObj,
        },
      });
      const errors = res.data?.accountUpdate.errors;
      if (errors && errors.length > 0) {
        errors.map((err) => {
          addToast({
            title: err.field,
            description: err.message,
            color: "warning",
          });
        });
        return;
      }
      addToast({
        title: "Account Updated Successfully",
        description:
          "Your account Information and personal Data updated Successfully",
        color: "success",
      });
    },
  });

  return (
    <div>
      <h1 className="font-semibold text-3xl">Personal data</h1>
      <p className="text-neutral-600 text-sm mt-2">
        Fill your personal data so it can be reused during checkout.
      </p>

      <Card shadow="sm" className="my-4 p-2">
        <CardHeader className="flex items-center gap-2">
          <IconUserEdit />
          Personal Info
        </CardHeader>

        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <form.Field
              name="firstName"
              children={(field) => (
                <Input
                  label="First Name"
                  variant="bordered"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />

            <form.Field
              name="lastName"
              children={(field) => (
                <Input
                  label="Last Name"
                  variant="bordered"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />

            <form.Field
              name="dob"
              children={(field) => (
                <Input
                  label="Date of Birth"
                  type="date"
                  variant="bordered"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />

            <form.Field
              name="gender"
              children={(field) => (
                <Select
                  label="Gender"
                  variant="bordered"
                  selectedKeys={
                    field.state.value ? new Set([field.state.value]) : new Set()
                  }
                  onSelectionChange={(keys) =>
                    field.handleChange([...keys][0] as string)
                  }
                >
                  <SelectItem key="male">Male</SelectItem>
                  <SelectItem key="female">Female</SelectItem>
                  <SelectItem key="other">Other</SelectItem>
                </Select>
              )}
            />

            <form.Field
              name="phone"
              children={(field) => (
                <Input
                  label="Phone Number"
                  variant="bordered"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="faded"
              color="danger"
              disabled={!form.state.isDirty}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              isLoading={updating}
              disabled={!form.state.isDirty}
              onPress={() => {
                form.handleSubmit();
              }}
            >
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

const accountUpdateMutation = gql`
  mutation accountUpdate($input: AccountInput!) {
    accountUpdate(input: $input) {
      errors {
        field
        code
        message
      }
      user {
        firstName
        lastName
        metadata {
          key
          value
        }
      }
    }
  }
`;

export default AccountPage;
