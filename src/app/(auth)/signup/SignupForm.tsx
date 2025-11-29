"use client";

import { createNewUser } from "@/actions/auth/createNewUser";
import { addToast, Button, Input } from "@heroui/react";
import React from "react";

function SignupForm() {
  const handleSignup = async (formData: FormData) => {
    const response = await createNewUser(formData);
    addToast({
      title: "Signup Successful",
      description: "Your account has been created successfully.",
    });
  };

  return (
    <form className="my-6" action={handleSignup}>
      <Input
        type="text"
        label="Username"
        name="username"
        labelPlacement="inside"
        placeholder="Enter username"
      />
      <Input
        type="email"
        label="Email"
        name="email"
        className="my-4"
        labelPlacement="inside"
        placeholder="Enter your email"
      />
      <Input
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
      />
      <div>
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
