"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { loginSchema, LoginSchema } from "@/lib/schema/login";
import { createClient } from "@/lib/supabase/client";
import { AuthForm } from "../_components/AuthForm";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const onSubmit = useCallback(
    async ({ email, password }: LoginSchema) => {
      setLoading(true);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          toast.error(error.message || "Login failed. No session returned.");
          return;
        }

        if (data.session) {
          toast.success("Sign-in successful!");
          router.push("/");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unexpected error occurred";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [supabase, router]
  );

  useEffect(() => {
    if (searchParams.get("expired") === "true") {
      toast.error("Your session has expired. Please sign in again.");
    }
  }, [searchParams]);

  return (
    <>
      <AuthForm<LoginSchema>
        schema={loginSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
          { name: "password", label: "Password", type: "password", placeholder: "••••••" },
        ]}
      />

      <LoadingOverlay
        show={loading}
        label="Signing In..."
        className="border-green-600"
        textColor="text-green-600"
      />
    </>
  );
}
