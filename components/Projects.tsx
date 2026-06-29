'use client';

import ProjectCard from './ProjectCard';
import { getFeaturedProjectsAction } from '@/actions/github';
import { useQuery } from '@tanstack/react-query';

export default function Projects() {
  const { data: featuredProjects, error } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: getFeaturedProjectsAction,
  });

  // Graceful fallback UI in case the GitHub network handshake completely fails
  if (error) {
    return (
      <div className='rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-900/30 dark:bg-red-950/10'>
        <p className='text-sm text-red-600 dark:text-red-400'>
          Failed to synchronize project metrics from GitHub. Please try
          reloading.
        </p>
      </div>
    );
  }

  return (
    <section
      id='projects'
      className='scroll-mt-24 space-y-8 text-zinc-900 dark:text-zinc-50'
    >
      <h2 className='text-2xl font-semibold tracking-tight'>
        Featured Engineering Work
      </h2>

      <div className='grid gap-6 sm:grid-cols-2'>
        {featuredProjects?.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
