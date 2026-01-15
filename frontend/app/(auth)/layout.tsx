"use client";

import { ReactNode, Suspense, } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { errorMsg } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-zinc-50 dark:bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
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
      </motion.div>
    </div>
  );
}
