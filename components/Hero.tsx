import ResumeButton from "./ResumeButton";

export default function Hero() {
	return (
  <header className="space-y-6 mb-8">
    <div className="space-y-2">
      <p className="text-sm font-mono tracking-wider text-blue-600 dark:text-blue-400 uppercase">
        Recent Graduate, Software Engineer
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl">
        Engineering full-stack systems and algorithmic solutions.
      </h1>
    </div>
    
    <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-xl">
      Focusing on clean system architecture, full-stack ecosystems, and performance optimization. 
      Welcome to my technical portfolio.
    </p>

    <div className="flex flex-wrap gap-4 pt-2">
      <a
        href="#projects"
        className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        View Projects
      </a>
      <ResumeButton />
    </div>
  </header>
  )
}