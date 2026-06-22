import { marked } from 'marked';
import Slideshow from './Slideshow';

interface AboutProps {
  initialContent: string;
}

export default function About({ initialContent }: AboutProps) {
  const htmlContent = marked.parse(initialContent || '...');
  
  return (
    <section
      id="about"
      className="border-b border-zinc-200 dark:border-zinc-800 pb-16 mb-8 space-y-8 scroll-mt-24 pt-12 border-t"
    >
      <div className="grid gap-12 md:grid-cols-12 md:items-start">
        
        {/* 📷 Left Column: Sticky Slideshow Frame */}
        <div className="md:col-span-5 md:sticky md:top-28 h-fit flex flex-col justify-center md:justify-start">
          <div className="w-full h-auto rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/50 p-2 shadow-xs">
            <Slideshow />
          </div>
          <div className="pt-3 px-1 text-center md:text-left">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md">
              Based in Ontario, Canada
            </span>
          </div>
        </div>

        {/* 📝 Right Column: Who you are & your engineering focus */}
        <div className="md:col-span-7 space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
            Behind the Code
          </h2>
          
          <div 
            className="
              text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4
              [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-zinc-900 dark:[&_h3]:text-zinc-50 [&_h3]:mt-8 [&_h3]:mb-2.5 [&_h3]:tracking-tight
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-3 [&_ul]:my-4
              [&_strong]:text-zinc-900 dark:[&_strong]:text-zinc-50 [&_strong]:font-semibold
              [&_p]:mb-4
            "
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

      </div>
    </section>
  );
}