"use client";

import toast from "react-hot-toast";
import { loginSchema, LoginSchema } from "@/lib/schema/login";
import { AuthForm } from "../_components/AuthForm";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/hooks/useAuth";
import Authtabs from "../_components/Authtabs";

export default function SignIn() {
  const searchParams = useSearchParams();
  const { handleOAuthLogin, handleLogin, loading } = useAuth();

  useEffect(() => {
    if (searchParams.get("expired") === "true") {
      toast.error("Your session has expired. Please sign in again.");
    }
  }, [searchParams]);

  return (
    <Card className="max-w-lg w-full p-6 shadow-md rounded-xl bg-white dark:bg-zinc-900">
      <CardHeader>
        <Typography variant="h2" className="text-center font-bold text-zinc-900 dark:text-white">
          Welcome Back
        </Typography>
        <Typography variant="small" className="text-center mt-2 text-zinc-600 dark:text-zinc-400">
          Sign in to access your Blog Posts and continue where you left off
        </Typography>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <Button
          type="button"
          variant="default"
          aria-busy={loading.state}
          disabled={loading.state}
          onClick={() => handleOAuthLogin("google")}
        >
          <FcGoogle className="text-xl" />
          {loading.state ? "Redirecting..." : "Continue with Google"}
        </Button>

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <Typography
              variant="small"
              className="px-2 bg-white dark:bg-zinc-900 text-gray-400 dark:text-zinc-500"
            >
              Or sign in with email
            </Typography>
          </div>
        </div>
        
        <Authtabs />

        <AuthForm<LoginSchema>
          schema={loginSchema}
          defaultValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
          fields={[
            { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            { name: "password", label: "Password", type: "password", placeholder: "••••••" },
          ]}
        />

        <LoadingOverlay
          show={loading.state}
          label={loading.text}
          className="border-green-600"
          textColor="text-green-600"
        />
      </CardContent>
    </Card>
  );
}
