"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { FaGithub, FaGoogle } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email({ message: "Enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignUpView = () => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (pending) return;
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          form.reset();
          router.push("/");
        },
        onError: ({ error: err }) => {
          setPending(false);
          setError(err?.message ?? "Sign up failed. Please try again.");
        },
      }
    );
  };

  const onSocialSignUp = (provider: "github" | "google") => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          form.reset();
        },
        onError: ({ error: err }) => {
          setPending(false);
          setError(err?.message ?? "Sign up failed. Please try again.");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form Section */}
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
                  <p className="text-muted-foreground text-balance">
                    Create your account
                  </p>
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="cursor-text"
                            type="text"
                            autoComplete="name"
                            placeholder="Jane Doe"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="cursor-text"
                            type="email"
                            autoComplete="email"
                            placeholder="me@example.com"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            className="cursor-text"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            placeholder="*******"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input
                            className="cursor-text"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            placeholder="*******"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {!!error && (
                  <Alert
                    variant="destructive"
                    role="alert"
                    aria-live="assertive"
                    className="bg-destructive/10 border-none"
                  >
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle className="text-sm">
                      Something went wrong
                    </AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  disabled={pending}
                  aria-busy={pending}
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  Sign up
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    disabled={pending}
                    variant="outline"
                    aria-label="Continue with Google"
                    className="cursor-pointer w-full"
                    type="button"
                    onClick={() => {
                      onSocialSignUp("google");
                    }}
                  >
                    <FaGoogle />
                  </Button>
                  <Button
                    disabled={pending}
                    variant="outline"
                    aria-label="Continue with GitHub"
                    className="cursor-pointer w-full"
                    type="button"
                    onClick={() => {
                      onSocialSignUp("github");
                    }}
                  >
                    <FaGithub />
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          {/* Welcome Section */}
          <div className="relative hidden md:flex flex-col gap-y-4 items-center justify-center rounded-r-2xl shadow-lg bg-gradient-to-br from-orange-800/90 to-orange-600/80 border border-orange-700/40 backdrop-blur-sm backdrop-saturate-150">
            <Image
              src="/logo.svg"
              alt="MeetAI logo"
              width={67}
              height={41}
              priority
            />
            <p className="text-3xl text-yellow-500 font-bold">
              Welcome to <strong>MeetAI</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};
