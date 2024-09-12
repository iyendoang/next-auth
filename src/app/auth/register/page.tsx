"use client";

import AuthLayout from "@/components/auth/auth-layout"; // Import the layout
import RegisterForm from "@/components/auth/register-form";

export default function LoginPage() {
  return (
    <AuthLayout
      auth_title="Register a New Account"
      auth_description="Please register to proceed your account."
      href_auth_button="/auth/login"
      link_auth_text="Already have an account? Login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
