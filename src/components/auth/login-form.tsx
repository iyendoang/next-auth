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
import { LoginType, loginSchema } from "@/schemas/auth";
import { loginUser } from "@/services/auth/login";
import { handleFieldErrors } from "@/utils/handle-field-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    setIsPending(true);
    setError(null);
    try {
      const response = await loginUser(data);
      if (response.status === true) {
        const expiresIn = response.expires_in;
        const expirationDate = new Date(Date.now() + (expiresIn ?? 0) * 1000);
        setCookie("token", response.access_token || "", {
          path: "/",
          expires: expirationDate,
        });
        toast({
          title: response.title,
          description: response.message,
        });
        form.reset();
        router.push("/admin/dashboard");
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
    name: "email" | "password";
    label: string;
    placeholder: string;
    type?: string;
  }[] = [
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
              <>Login</>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
