import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

const blogPosts = [
  {
    title: "Why Pacetory uses Express + Drizzle for scalable publishing",
    excerpt: "Explore how our backend architecture balances developer control with performance and extensibility.",
    href: "/blog/express-drizzle-scalability",
  },
  {
    title: "Designing theme-adaptive blog components with Tailwind and shadcn/ui",
    excerpt: "Learn how we built flexible, responsive components that adapt to any theme or layout.",
    href: "/blog/theme-adaptive-components",
  },
  {
    title: "How Supabase simplifies secure authentication for modern content platforms",
    excerpt: "A deep dive into our auth flow and why Supabase makes it seamless for creators and devs.",
    href: "/blog/supabase-auth",
  },
  {
    title: "Monorepo workflows with Next.js and TypeScript for blog extensibility",
    excerpt: "See how our monorepo setup improves DX, scalability, and plugin integration.",
    href: "/blog/monorepo-next-typescript",
  },
  {
    title: "Tailark integration: building beautiful hero sections that convert",
    excerpt: "We break down our hero section strategy using Tailark’s customizable components.",
    href: "/blog/tailark-hero-sections",
  },
]

export default function LatestBlogSection() {
  return (
    <section id="latest-blog" className="scroll-mt-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Latest Blog & Stories from Pacetory
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Discover tips, ideas, and behind‑the‑scenes stories on building, designing, and sharing content that truly connects. Whether you’re a blogger, creator, or developer, Pacetory brings together creativity and technology to help you publish with ease and impact.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.href} className="hover:bg-muted transition bg-background justify-between">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="mx-auto">
                <Link href={post.href} className="text-sm font-medium text-primary hover:underline">
                  Read more →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
