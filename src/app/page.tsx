// src/app/page.tsx
'use client';

import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search-channels?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center text-white">
      <div className="mt-[30vh] flex flex-col items-center gap-12">
        {/* Logo */}
        <Image 
          src="/twitch.png" 
          alt="Twitch Logo" 
          width={240} 
          height={240} 
          className="w-auto h-auto"
        />
        
        {/* Search form */}
        <form onSubmit={handleSearch} className="w-full max-w-3xl px-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find something to watch..."
            className="w-full px-6 py-4 rounded-lg bg-purple-700 text-white placeholder-purple-300 border border-purple-500 focus:outline-none focus:border-purple-400 text-xl"
          />
        </form>
      </div>
    </div>
  )
}