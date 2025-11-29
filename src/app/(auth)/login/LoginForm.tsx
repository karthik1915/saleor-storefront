"use client";

import React from "react";
import Link from "next/link";
import { loginUser } from "@/actions/auth/loginUser";
import { addToast, Button, Input } from "@heroui/react";

function LoginForm() {
  const handleLogin = async (formData: FormData) => {
    const response = await loginUser(formData);
    addToast({
      title: "Login Successful",
      description: "You have logged in successfully.",
    });
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
