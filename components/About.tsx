"use client";

import Slideshow from "./Slideshow";

export default function About() {
  return (
    <section id="about" className="mb-8 space-y-8 scroll-mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="grid gap-8 md:grid-cols-3 md:items-start">
        
        {/* 📷 Left Column: Your automated Google Drive slideshow component */}
        <div className="md:col-span-1 flex justify-center md:justify-start">
          <div className="w-48 h-48 md:w-full md:h-auto">
            <Slideshow />
          </div>
        </div>

        {/* 📝 Right Column: Who you are & your engineering focus */}
        <div className="md:col-span-2 space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Behind the Code
          </h2>
          
          <p>
            Hi, I&apos;m a software developer focused on building highly automated, 
            efficient applications. I love solving complex structural problems; whether that&apos;s 
            architecting seamless data pipelines using modern frontend frameworks or writing custom script 
            automations to optimize digital systems and developer workflows.
          </p>
          
          <p>
            When I&apos;m not configuring linters, reviewing algorithmic solutions, or deep in a TypeScript file, 
            you can usually find me designing custom extensions and mechanical rule automations for 
            virtual tabletop platforms, or exploring new hardware configurations.
          </p>

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