'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const images = [
  {
    src: '/portfolio-images/photo_london.jpg',
    alt: 'Ishaan at Buckingham Palace, London',
  },
  {
    src: '/portfolio-images/photo_dnd_1.jpg',
    alt: 'Ishaan at a tabletop RPG session',
  },
  {
    src: '/portfolio-images/photo_dnd_2.jpg',
    alt: 'Ishaan at a tabletop RPG session',
  },
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!images.length) {
      return;
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      startTimer();
    }
    // Clean up the timer when the component unmounts to prevent memory leaks
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  // Handle manual dot navigation button click clicks
  const handleNavClick = (index: number) => {
    setCurrentIndex(index);
    startTimer();
  };

  if (!images || images.length === 0) {
    return (
      <div className='flex aspect-[2/3] w-full flex-col items-center justify-center space-y-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800/80 dark:bg-zinc-950/40'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6 text-zinc-400'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375 0 1 1-.75 0 .375 0 0 1 .75 0Z'
          />
        </svg>
        <span className='font-mono text-xs text-zinc-400'>
          Slideshow unavailable
        </span>
      </div>
    );
  }

  return (
    <div className='shadow-xs group relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900'>
      {/* 🖼️ Stacked Image Elements Wrapper */}
      {images.map((image, index) => (
        /* 💡 NEW: Absolute positioning container wrapper that monitors the currentIndex slider state */
        <div
          key={image.src}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
          }`}
        >
          {/* 🌫️ Layer 1: Blurred background image to elegantly fill any letterboxing space */}
          <Image
            src={image.src}
            alt=''
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 420px'
            priority={index === 0}
            className='pointer-events-none select-none object-cover opacity-30 blur-xl'
          />

          {/* 🖼️ Layer 2: The actual crisp photo, constrained completely without any cropping */}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 420px'
            priority={index === 0}
            className='object-contain transition-all duration-500'
          />
        </div>
      ))}

      {/* 🎛️ Navigation Indicators Overlay (Only renders if there's more than one photo) */}
      {images.length > 1 && (
        <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/10 bg-black/10 px-2.5 py-1 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-3.5 bg-white'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Show photo indicator ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
