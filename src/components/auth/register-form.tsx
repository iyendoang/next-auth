import { FormError } from "@/components/form-error";
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
import { toast } from "@/hooks/use-toast";
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

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    setIsPending(true);
    setError(null); // Reset error state

    try {
      // Attempt to register the user
      const response = await registerUser(data);

      if (response.status === true) {
        // Show success message
        toast({
          title: response.title,
          description: response.message,
        });

        // Reset form and navigate to login page
        form.reset();
        router.push("/auth/login");
      } else {
        toast({
          variant: "destructive",
          title: response.title,
          description: response.message,
        });
        if (response.errors) {
          handleFieldErrors(response.errors, form.setError);
        }
        setError(
          response.message ||
            "An unexpected error occurred. Please try again later."
        );
      }
    } catch (error) {
      const err = error as APIErrorResponse;
      if (err.errors) {
        handleFieldErrors(err.errors, form.setError);
      } else {
        setError(
          err.message || "An unexpected error occurred. Please try again later."
        );
      }
    } finally {
      setIsPending(false);
    }
  };

  const fields: {
    name: "name" | "email" | "password" | "password_confirm";
    label: string;
    placeholder: string;
    type?: string;
  }[] = [
    { name: "name", label: "Full Name", placeholder: "Enter Full name" },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password",
    },
    {
      name: "password_confirm",
      label: "Confirm Password",
      placeholder: "Confirm password",
      type: "password",
    },
  ];

  return (
    <>
      <FormError className="mb-2" message={error ?? ""} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 -mt-1"
        >
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem className="space-y-1">
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

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
