'use client'

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import HeroSection from "@/components/hero-section";
import Features from "@/components/features";
import FooterSection from "@/components/footer";
import { User } from "@supabase/supabase-js";
import LatestBlog from "@/components/latest-blog";

export default function LnadingPage() {
  const [user, setUser] = useState<User | null>(null)

  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        return;
      }
      setUser(data?.user ?? null)
    }

    checkUser()

  }, [supabase.auth])

  return (
    <main>
      <HeroSection user={user} />
      <Features />
      <LatestBlog />
      <FooterSection />
    </main>
  );
}
