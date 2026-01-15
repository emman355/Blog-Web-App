"use client";

import { AuthForm } from "../_components/AuthForm";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Authtabs from "../_components/Authtabs";
import { useAuth } from "@/hooks/useAuth";
import { signUpSchema, SignUpSchema } from "@/lib/schema/sign-up";

export default function SignUp() {
  const { loading, handleOAuthLogin, handleSignUp, errorMsg } = useAuth();

  return (
    <Card className="max-w-lg w-full p-6 shadow-md rounded-xl bg-white dark:bg-zinc-900">
      <CardHeader>
        <Typography variant="h2" className="text-center font-bold text-zinc-900 dark:text-white">
          Welcome Back
        </Typography>
        <Typography variant="small" className="text-center mt-2 text-zinc-600 dark:text-zinc-400">
          Create youre account to get started with Blog Posts
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
          {loading.text || "Continue with Google"}
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
              Or sign up with email
            </Typography>
          </div>
        </div>

        <Authtabs />
        {/* Animated feedback (optional, can remove if using only toast) */}
        <AnimatePresence>
          {errorMsg && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-red-600 text-sm"
            >
              {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <AuthForm<SignUpSchema>
          schema={signUpSchema}
          defaultValues={{ email: "", password: "" }}
          onSubmit={handleSignUp}
          fields={[
            {
              name: "firstName",
              label: "First Name",
              type: "text",
              placeholder: "Enter your first name",
            },
            {
              name: "lastName",
              label: "Last Name",
              type: "text",
              placeholder: "Enter your last name",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "you@example.com",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Please enter your password",
            },
          ]}
        />

        <LoadingOverlay
          show={loading.state}
          label={loading.text}
          className="border-blue-600"
          textColor="text-blue-600"
        />
      </CardContent>
    </Card>
  );
}
