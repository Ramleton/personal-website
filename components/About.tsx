"use client";

import { marked } from "marked";
import Slideshow from "./Slideshow";

interface AboutProps {
	initialContent: string;
}

export default function About({ initialContent }: AboutProps) {
	const htmlContent = marked.parse(initialContent || "Biography content loading...");
  return (
    <section
      id="about"
      className="border-b border-zinc-200 dark:border-zinc-800 pb-12 mb-8 space-y-8 scroll-mt-24 pt-12 border-t"
    >
      {/* 💡 CHANGED: Bumped grid to md:grid-cols-5 to allow much finer sizing control */}
      <div className="grid gap-10 md:grid-cols-5 md:items-start">
        
        {/* 📷 Left Column: Your automated Google Drive slideshow component */}
        {/* 💡 CHANGED: Swapped md:col-span-1 to md:col-span-2. The slideshow now gets 40% of the screen space! */}
        <div className="md:col-span-2 flex justify-center md:justify-start">
          {/* Removed max-w-xs constraints so the image scales to the full width of its new 2-column home */}
          <div className="w-full max-w-sm md:max-w-none h-auto">
            <Slideshow />
          </div>
        </div>

        {/* 📝 Right Column: Who you are & your engineering focus */}
        {/* 💡 CHANGED: Adjusted to md:col-span-3 so the text takes up the remaining 60% */}
        <div className="md:col-span-3 space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Behind the Code
          </h2>
          <div 
            className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <div className="pt-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md">
              📍 Based in Ontario, Canada
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}