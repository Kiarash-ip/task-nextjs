import React from "react";
import { LoginForm } from "./components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود به داشبورد",
  description: "این یک متن تست است",
};

export default function Login() {
  return (
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  );
}
