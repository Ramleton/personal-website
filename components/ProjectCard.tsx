'use client';

import { FeaturedProject } from '@/types/projects';
import { useQuery } from '@tanstack/react-query';

interface ProjectCardProps {
  project: FeaturedProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['project-status', project.liveUrl],
    queryFn: async () => {
      if (!project.liveUrl) {
        return { isLive: false };
      }
      const res = await fetch(`/api/check-status?url=${project.liveUrl}`);
      return res.json() as Promise<{ isLive: boolean }>;
    },
    staleTime: 600000,
  });

  const isLive = data?.isLive ?? false;

  return (
    <div className='shadow-xs group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700'>
      <div className='space-y-4'>
        {/* Title & Star Counter Row */}
        <div className='flex items-start justify-between gap-4'>
          <h3 className='text-xl font-medium tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400'>
            {project.title}
          </h3>

          {project.stars > 0 && (
            <div className='flex items-center gap-1 rounded-md border border-amber-200/40 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600 dark:border-amber-900/30 dark:bg-amber-950/40 dark:text-amber-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-3 w-3'
              >
                <path
                  fillRule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                  clipRule='evenodd'
                />
              </svg>
              <span>{project.stars}</span>
            </div>
          )}
        </div>

        {/* Description Paragraph */}
        <p className='text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
          {project.description}
        </p>

        {/* Technology Tags */}
        <div className='flex flex-wrap gap-1.5 pt-1'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className='inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 🔗 Isolated Action Links Container */}
      <div className='mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800/60 space-y-3'>
      <div className='flex items-center justify-between gap-4'>
        {/* GitHub Link Button */}
        <a
          href={project.url}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
        >
          <svg
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-3.5 w-3.5'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
            />
          </svg>
          Source Code
        </a>

        {/* Live Demo Link */}
        {project.liveUrl && (
          <>
            {isLoading ? (
              /* ⏳ 1. SKELETON STATE: Displays while the API route checks the network domain header */
              <div className='flex select-none items-center gap-1.5 font-mono text-xs text-zinc-400'>
                <div className='h-2 w-2 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-700' />
                Checking status...
              </div>
            ) : isLive ? (
              /* 🟢 2. ACTIVE LIVE STATE: Renders your gorgeous green ping indicator link */
              <a
                href={project.liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
              >
                <span className='relative flex h-1.5 w-1.5'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75'></span>
                  <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500'></span>
                </span>
                Live Demo
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                  />
                </svg>
              </a>
            ) : (
              /* 🔴 3. PAUSED/OFFLINE STATE: Changes style to clean disabled monochrome */
              <span
                className='inline-flex cursor-not-allowed select-none items-center gap-1.5 font-mono text-xs font-medium text-zinc-400 dark:text-zinc-600'
                title='Demo is currently offline or paused'
              >
                <span className='h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700' />
                Demo Paused
              </span>
            )}
          </>
        )}
      </div>

      <div className='flex items-center justify-between gap-4'>

        {/* Commit Count */}
        {project.commitCount !== null && (
          <span className='inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3.5 w-3.5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            {project.commitCount} commits
          </span>
        )}

        {/* Last Updated */}
        <span className='inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-3.5 w-3.5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
          Last Updated {new Date(project.lastUpdated).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
          </span>
        </div>
      </div>
    </div>
  );
}
