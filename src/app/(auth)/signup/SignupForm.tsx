"use client";

import React from "react";
import Link from "next/link";
import { appData } from "@/lib/data";
import { useMutation } from "@apollo/client/react";
import { addToast, Button, Input } from "@heroui/react";
import { CUSTOMER_CREATE } from "./customerCreate";

function SignupForm() {
  const [registerAccount, { error }] = useMutation(CUSTOMER_CREATE);

  const handleSignup = async (formData: FormData) => {
    const input = {
      email: formData.get("email") as string,
      // password: formData.get("password") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      // metadata: [
      //   { firstName: formData.get("firstName") as string },
      //   { lastName: formData.get("lastName") as string },
      // ],
      channel: appData["channel-slug"],
      // redirectUrl: "http://localhost:3000/confirm-email",
    };

    const res = await registerAccount({ variables: { input } });

    if (error) {
      addToast({
        title: "Signup Failed",
        description: error.message,
        color: "danger",
      });
      return;
    }

    addToast({
      title: "Signup Successful",
      description: "Confirmation email sent to your email address.",
      color: "success",
    });
  };

  return (
    <form className="my-6" action={handleSignup}>
      <div className="flex items-center justify-center gap-4">
        <Input
          type="text"
          label="First Name"
          name="firstName"
          labelPlacement="inside"
          placeholder="Enter first name"
        />
        <Input
          type="text"
          label="Last Name"
          name="lastName"
          labelPlacement="inside"
          placeholder="Enter last name"
        />
      </div>
      <Input
        type="email"
        label="Email"
        name="email"
        className="my-4"
        labelPlacement="inside"
        placeholder="Enter your email"
      />
      {/* <Input
        type="password"
        label="Password"
        name="password"
        labelPlacement="inside"
        className="my-4"
        placeholder="Enter your new password"
      />
      <Input
        type="password"
        label="Confirm Password"
        name="confirm-password"
        labelPlacement="inside"
        className="my-4"
        placeholder="Confirm your password"
      /> */}
      <div className="flex items-center justify-between text-neutral-600">
        <p className="text-sm ">
          Already Have an account?{" "}
          <Link href="/login" className="underline">
            Login here.
          </Link>
        </p>
        <Button
          className="float-end"
          variant="solid"
          color="primary"
          type="submit"
        >
          Signup
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;
