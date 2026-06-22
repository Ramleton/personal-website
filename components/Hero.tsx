import ResumeButton from './ResumeButton';

export default function Hero() {
  return (
    <header className='mb-8 space-y-6'>
      <div className='space-y-2'>
        <p className='font-mono text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400'>
          Recent Graduate, Software Engineer
        </p>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl'>
          Engineering full-stack systems and algorithmic solutions.
        </h1>
      </div>

      <p className='max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
        Focusing on clean system architecture, full-stack ecosystems, and
        performance optimization. Welcome to my technical portfolio.
      </p>

      <div className='flex flex-wrap gap-4 pt-2'>
        <a
          href='#projects'
          className='inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200'
        >
          View Projects
        </a>
        <ResumeButton />
      </div>
    </header>
  );
}
