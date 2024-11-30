// src/components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type SearchType = 'channel' | 'title' | 'game';

type SearchBarProps = {
  initialQuery?: string;
  onSearch?: (query: string, type: SearchType) => void;
  className?: string;
  initialSearchType?: SearchType;
};

export default function SearchBar({ 
  initialQuery = '', 
  onSearch, 
  className = '',
  initialSearchType = 'channel'
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<SearchType>(initialSearchType);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery, searchType);
      } else {
        router.push(`/search-channels?q=${encodeURIComponent(searchQuery)}&type=${searchType}`);
      }
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find something to watch..."
            className="w-full px-6 py-4 rounded-lg bg-[#3d3d3d] text-white placeholder-gray-400 border border-[#484848] focus:outline-none focus:border-[#6441a5] text-xl"
          />
        </div>
        
        <div className="relative">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            className="pl-6 pr-12 py-4 rounded-lg bg-[#3d3d3d] text-tr border border-[#484848] focus:outline-none focus:border-[#6441a5] text-xl cursor-pointer appearance-none min-w-[140px]"
          >
            <option value="channel">Channel</option>
            <option value="title">Title</option>
            <option value="game">Game</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
            </svg>
          </div>
        </div>
      </form>
      
      <button
        onClick={handleSearch}
        className="mt-6 px-8 py-3 bg-[#6441a5] hover:bg-[#7d5bbe] text-white rounded-lg font-medium transition-colors duration-200 mx-auto block w-1/5 min-w-[120px]"
      >
        Search
      </button>
    </div>
  );
}