"use client";

import { getFeaturedProjects } from "@/services/github";
import { useQuery } from "@tanstack/react-query";

export default function Projects() {
	const { data: featuredProjects, error } = useQuery({
		queryKey: ['featured-projects'],
		queryFn: getFeaturedProjects
	});

	// Graceful fallback UI in case the GitHub network handshake completely fails
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-900/30 dark:bg-red-950/10">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to synchronize project metrics from GitHub. Please try reloading.
        </p>
      </div>
    );
  };

	return (
    <section id="projects" className="space-y-8 scroll-mt-24">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Featured Engineering Work</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {featuredProjects?.map((project) => (
          <a
            key={project.slug}
            href={project.url} // Dynamically navigates straight to your repository
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 rounded-xl border border-zinc-200 bg-white shadow-xs transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Render GitHub Star Counter dynamically if stars exist */}
                  {project.stars > 0 && (
                    <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200/40 dark:border-amber-900/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3 h-3"
                      >
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                      <span>{project.stars}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {/* Dynamic programming languages / topic tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-mono font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}