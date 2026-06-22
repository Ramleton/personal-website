"use client";

import { getPortfolioImages } from "@/services/portfolioImages";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Slideshow() {
  // 🔗 Fetch the pre-fetched images cleanly from the TanStack cache boundary
  const { data: images, error } = useQuery({
    queryKey: ['portfolio-images'],
		queryFn: getPortfolioImages
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // ⏱️ Automatically cycle through images every 4 seconds
  useEffect(() => {
		if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [images]);

  // Handle manual dot navigation button click clicks
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // ⏳ 1. Loading State Placeholder (Matches the exact dimensions of the image layout)
  if (!images && !error) {
    return (
      <div className="w-full aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
        <span className="text-xs text-zinc-400 font-mono">Syncing asset stream...</span>
      </div>
    );
  }

  // ⚠️ 2. Graceful Error Fallback (If your API key or folder ID fails, it won't crash the UI)
  if (error || !images || images.length === 0) {
    return (
      <div className="w-full aspect-square rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/40 dark:border-zinc-800/80 flex flex-col items-center justify-center p-4 text-center space-y-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375 0 1 1-.75 0 .375 0 0 1 .75 0Z" />
        </svg>
        <span className="text-xs text-zinc-400 font-mono">Slideshow unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs group">
      
      {/* 🖼️ Stacked Image Elements Wrapper */}
      {images.map((image, index) => (
        /* 💡 NEW: Absolute positioning container wrapper that monitors the currentIndex slider state */
        <div
          key={image.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* 🌫️ Layer 1: Blurred background image to elegantly fill any letterboxing space */}
					<Image
						src={image.embedUrl}
						alt=""
						fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 420px"
						priority={index === 0}
						className="object-cover blur-xl opacity-30 select-none pointer-events-none"
					/>

					{/* 🖼️ Layer 2: The actual crisp photo, constrained completely without any cropping */}
					<Image
						src={image.embedUrl}
						alt={image.name}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 420px"
						priority={index === 0}
						className="object-contain transition-all duration-500"
					/>
        </div>
      ))}

      {/* 🎛️ Navigation Indicators Overlay (Only renders if there's more than one photo) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-white w-3.5" 
                  : "bg-white/40 hover:bg-white/70 w-1.5"
              }`}
              aria-label={`Show photo indicator ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}