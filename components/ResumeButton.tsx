'use client';

import { getResumeData } from '@/services/resume';
import { useQuery } from '@tanstack/react-query';

export default function ResumeButton() {
  const { data: resume } = useQuery({
    queryKey: ['resume-data'],
    queryFn: getResumeData,
  });

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
      <a
        href={resume?.pdfUrl || '#'}
        target='_blank' // 💡 Crucial: This forces it to spawn in a new browser tab
        rel='noopener noreferrer' // Security best practice for target="_blank"
        className='shadow-xs inline-flex h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800'
      >
        {/* Updated Arrow Symbolizing "External Link / New Tab" */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-2 h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
          />
        </svg>
        View Resume
      </a>

      {resume?.lastUpdated && (
        <span className='font-mono text-xs text-zinc-400 sm:ml-2'>
          Synced: {resume.lastUpdated}
        </span>
      )}
    </div>
  );
}
