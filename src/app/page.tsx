// src/app/page.tsx
'use client';

import Image from 'next/image'
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center text-white">
      <div className="mt-[30vh] flex flex-col items-center gap-12">
        <Image 
          src="/twitch.png" 
          alt="Twitch Logo" 
          width={240} 
          height={240} 
          className="w-auto h-auto"
        />
        
        <div className="w-full max-w-3xl px-4">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}