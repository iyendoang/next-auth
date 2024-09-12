"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { APIErrorResponse } from "@/schemas/api-error-response";
import { RegisterType, registerSchema } from "@/schemas/auth";
import { registerUser } from "@/services/auth/register";
import { handleFieldErrors } from "@/utils/handle-field-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function FormRegister() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: ""
    }
  });

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    setIsPending(true);
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const response = await registerUser(data);
      
      // Handle response
      if (response.status === "success") {
        setSuccess(response.message);
        form.reset(); // Reset form on success
        router.push("/auth/login");
      } else {
        // Handle non-field-specific errors
        setError(response.message || "An unexpected error occurred. Please try again later.");
        
        // Handle field-specific errors
        if (response.errors) {
          handleFieldErrors(response.errors, form.setError);
        }
      }
    } catch (error) {
      const err = error as APIErrorResponse;

      // Handle field-specific errors globally
      if (err.errors) {
        handleFieldErrors(err.errors, form.setError);
      } else {
        // Handle non-field-specific errors
        setError(err.message || "An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="grid gap-2 text-start">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground">To start using this app</p>
      </div>

      {/* Error & Success Messages */}
      <FormError className="mb-2" message={error ?? ""} />
      <FormSuccess className="mb-2" message={success ?? ""} />

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 -mt-1"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="email"
                    placeholder="email@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="password_confirm"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            disabled={isPending}
            type="submit"
            variant="default"
            size="lg"
            className="mt-4"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Please wait...
              </>
            ) : (
              <>Register</>
            )}
          </Button>

          {/* Link to Login Page */}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-1">
            Already have an account?
            <Button variant="link" className="ml-1 px-0" asChild>
              <Link href="/auth/login" title="Login">
                Login
              </Link>
            </Button>
          </p>
        </form>
      </Form>
    </>
  );
}
