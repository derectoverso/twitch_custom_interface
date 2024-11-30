// src/components/Navigation.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

    // Don't render navigation on home page
    if (pathname === '/') {
        return null;
    }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search-channels?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#18181b] h-[50px] border-b border-[#2d2d2d]">
      <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Left section - Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/twitch_icon.png" 
            alt="Twitch" 
            width={32} 
            height={32} 
            className="w-8 h-8"
          />
        </Link>

        {/* Middle section - Search */}
        {pathname !== '/search-channels' && (
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#1f1f23] border border-transparent hover:border-[#464649] focus:border-[#a970ff] text-white rounded-lg pl-4 pr-8 py-1.5 text-sm focus:outline-none"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-[#efeff1]">
                  <path fillRule="evenodd" d="M14.324 13.03a8 8 0 10-1.294 1.294l4.97 4.97a.916.916 0 101.294-1.294l-4.97-4.97zM2 8a6 6 0 1112 0A6 6 0 012 8z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Right section - Profile */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#3a3a3d] cursor-pointer">
            <Image
              src="/default_profile_icone.png"
              alt="Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}