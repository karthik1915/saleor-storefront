"use client";

import React from "react";
import Link from "next/link";
import { addToast, Button, Input } from "@heroui/react";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";

function LoginForm() {
  const { signIn } = useSaleorAuthContext();

  const handleLogin = async (formData: FormData) => {
    const response = await signIn({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    const errors = response.data?.tokenCreate?.errors;

    if (errors && errors.length > 0) {
      errors.map((e) => {
        addToast({
          title: "Login Failed",
          color: "danger",
          description: e.message,
        });
      });
    } else {
      addToast({
        title: "Login Successful",
        description: "You have logged in successfully.",
        color: "success",
      });
    }
  };

  return (
    <form className="my-6" action={handleLogin}>
      <Input
        type="email"
        label="Email"
        name="email"
        isRequired
        labelPlacement="inside"
        placeholder="Enter your email"
      />
      <Input
        type="password"
        label="Password"
        name="password"
        isRequired
        labelPlacement="inside"
        className="my-4"
        placeholder="Enter your password"
      />
      <div className="flex items-center justify-between text-neutral-600">
        <p className="text-sm ">
          Don&apos;t have and account?{" "}
          <Link href="/signup" className="underline">
            Signup now.
          </Link>
        </p>
        <Button variant="solid" color="primary" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
