import About from "@/components/About";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import { getFeaturedProjects } from "@/services/github";
import { getPortfolioImages } from "@/services/portfolioImages";
import { getResumeData } from "@/services/resume";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

async function preFetchData(queryClient: QueryClient) {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['featured-projects'],
      queryFn: getFeaturedProjects
    }),
    queryClient.prefetchQuery({
      queryKey: ['resume-data'],
      queryFn: getResumeData,
    }),
    queryClient.prefetchQuery({
      queryKey: ['portfolio-images'],
      queryFn: getPortfolioImages,
      staleTime: 0,
    })
  ]);
}

export default async function Home() {
  const queryClient = new QueryClient();
  await preFetchData(queryClient);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
      <main className="flex-1 flex flex-col justify-center max-w-4xl mx-auto px-6 py-24 md:py-32 w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Hero />
          <About />
          <Projects />
        </HydrationBoundary>
      </main>
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-xs text-zinc-500 dark:text-zinc-600">
        <p>© {new Date().getFullYear()} • Built with Next.js & TypeScript</p>
      </footer>
    </div>
  );
}
