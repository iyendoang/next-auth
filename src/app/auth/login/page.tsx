"use client";

import AuthLayout from "@/components/auth/auth-layout"; // Import the layout
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      auth_title="Login to Your Account"
      auth_description="Please enter your credentials to proceed."
      href_auth_button="/auth/register"
      link_auth_text="Don't have an account? Register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
