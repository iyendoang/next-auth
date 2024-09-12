import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  auth_title?: string;
  auth_description?: string;
  href_auth_button: string;
  link_auth_text?: string;
}

export default function AuthLayout({
  children,
  auth_title,
  auth_description,
  href_auth_button,
  link_auth_text,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              {auth_title} {/* Use title prop */}
            </h1>
            <p className="text-sm text-muted-foreground">{auth_description}</p>{" "}
            {/* Use description prop */}
          </div>
          {children} {/* This will render the LoginForm component */}
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href={href_auth_button} // Link passed as prop
              className="hover:text-brand underline underline-offset-4"
            >
              {link_auth_text}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
