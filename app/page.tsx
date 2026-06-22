import About from '@/components/About';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import { getFeaturedProjects } from '@/services/github';
import { getAboutContent } from '@/services/markdown';
import { getResumeData } from '@/services/resume';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function preFetchData(queryClient: QueryClient) {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['featured-projects'],
      queryFn: getFeaturedProjects,
    }),
    queryClient.prefetchQuery({
      queryKey: ['resume-data'],
      queryFn: getResumeData,
    }),
  ]);
}

export default async function Home() {
  const queryClient = new QueryClient();

  await preFetchData(queryClient);

  const markdownContent = getAboutContent();

  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50'>
      <main className='mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-24 md:py-32'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Hero />
          <About initialContent={markdownContent} />
          <Projects />
        </HydrationBoundary>
      </main>
      <footer className='border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-600'>
        <p>© {new Date().getFullYear()} • Built with Next.js & TypeScript</p>
      </footer>
    </div>
  );
}
