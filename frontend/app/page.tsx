import Typography from "@/components/typography";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <Typography variant="h2" className="max-w-x">
            Blog App
            <Typography variant="body1" className="max-w-md ">
              Create. Share. Inspire. A modern, fast, and beautiful blog platform built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui, featuring custom APIs, secure authentication with Supabase, and a scalable backend powered by Drizzle ORM. Effortlessly manage and publish content that engages your audience.
            </Typography>
          </Typography>
        </div>
      </main>
    </div>
  );
}
