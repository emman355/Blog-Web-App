"use client";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Typography from "@/components/typography";
import { ReactNode, Suspense, useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Authtabs from "./_components/Authtabs";
import { createClient } from "@/lib/supabase/client";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { AnimatePresence, motion } from "framer-motion";
export default function AuthLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // --- OAuth login ---
  const handleOAuthLogin = useCallback(
    async (provider: "google") => {
      setErrorMsg(null);
      setLoading(true);
      try {
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        toast.success("Signing in with google...");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unexpected error occurred";
        setErrorMsg(message);
        toast.error(message);
        setLoading(false); // only reset if there was an error
      }
    },
    [supabase]
  );


  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-zinc-50 dark:bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
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
              aria-busy={loading}
              disabled={loading}
              onClick={() => handleOAuthLogin("google")}
            >
              <FcGoogle className="text-xl" />
              {loading ? "Redirecting..." : "Continue with Google"}
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

            <AnimatePresence>
              {errorMsg && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-red-600 dark:text-red-500 text-sm text-center font-medium"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <Suspense>{children}</Suspense>
          </CardContent>
        </Card>
      </motion.div>

      <LoadingOverlay
        show={loading}
        label="Authenticating..."
        className="border-green-600 dark:border-green-400"
        textColor="text-green-600 dark:text-green-400"
      />
    </div>

  );
}
