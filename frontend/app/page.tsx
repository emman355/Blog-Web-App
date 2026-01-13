'use client'

import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setErrorMsg(`Error signing out: ${error.message}`);
        toast.error(error.message || "Error signing out");
        return;
      }
      toast.success("Signed out successfully!");
      router.refresh(); // ✅ ensures form state is reset
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error occurred";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [supabase, router]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* Animated feedback */}
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
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <Typography variant="h2" className="max-w-x">
            Blog App
            <Typography variant="body1" className="max-w-md ">
              Create. Share. Inspire. A modern, fast, and beautiful blog platform built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui, featuring custom APIs, secure authentication with Supabase, and a scalable backend powered by Drizzle ORM. Effortlessly manage and publish content that engages your audience.
            </Typography>
          </Typography>
          <Button variant="destructive" size="lg" onClick={signOut}>
            Logout
          </Button>
          <ModeToggle />
        </div>
      </main>
       {/* Overlay when loading */}
        <LoadingOverlay
          show={loading}
          label="Logging out..."
          className="border-red-600"
          textColor="text-red-600"
        />
    </div>
  );
}
