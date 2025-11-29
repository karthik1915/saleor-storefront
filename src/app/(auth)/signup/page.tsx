import React from "react";
import { appData } from "@/lib/data";
import SignupForm from "./SignupForm";

function SignupPage() {
  return (
    <main className="mx-auto max-w-md p-3 my-10">
      <h1 className="text-2xl font-semibold text-center text-pretty ">
        Signup to create {appData.name} account
      </h1>
      <p className="text-center text-neutral-600 my-2">
        Please enter your credentials to access your account.
      </p>
      <SignupForm />
    </main>
  );
}

export default SignupPage;
