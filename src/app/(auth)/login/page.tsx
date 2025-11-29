import React from "react";
import { appData } from "@/lib/data";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <main className="mx-auto max-w-md p-3 my-10">
      <h1 className="text-2xl font-semibold text-center text-pretty ">
        Login to your {appData.name} account
      </h1>
      <p className="text-center text-neutral-600 my-2">
        Please enter your credentials to access your account.
      </p>
      <LoginForm />
    </main>
  );
}

export default LoginPage;
