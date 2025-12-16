"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { IconUserEdit } from "@tabler/icons-react";
import React from "react";

function AccountPage() {
  return (
    <div>
      <h1 className="font-semibold text-3xl">Personal data</h1>
      <p className="text-neutral-600 text-sm mt-2">
        Fill Your personal data so that you don&apos;t have to enter data
        manually when placing an order.
      </p>
      <Card shadow="sm" className="my-4 p-2">
        <CardHeader>
          <IconUserEdit className="mr-2" />
          Personal Info
        </CardHeader>
        <CardBody className="space-y-4">
          <div>UserImage</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Input label="First Name" variant="bordered" />
            </div>
            <div>
              <Input label="Last Name" variant="bordered" />
            </div>
            <div>
              <Input label="Nick Name" variant="bordered" />
            </div>
            <div>
              <Input label="Date of Birth" variant="bordered" type="date" />
            </div>
            <div>
              <Select variant="bordered" label="Gender">
                <SelectItem>Male</SelectItem>
                <SelectItem>Female</SelectItem>
              </Select>
            </div>
            <div>
              <Input label="Country" variant="bordered" />
            </div>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Button variant="faded" color="danger" disabled>
              Cancel
            </Button>
            <Button variant="solid" color="primary" disabled>
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AccountPage;
