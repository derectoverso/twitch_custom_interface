// src/app/search-channels/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchChannels } from '@/lib/twitch-api';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

type SearchType = 'channel' | 'title' | 'game';

export default function SearchChannelsPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialType = (searchParams.get('type') as SearchType) || 'channel';
  
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<SearchType>(initialType);

  const { data: channels, isLoading, error } = useQuery({
    queryKey: ['searchChannels', debouncedQuery, searchType],
    queryFn: () => searchChannels(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const handleSearch = (query: string, type: SearchType) => {
    setDebouncedQuery(query);
    setSearchType(type);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Search Channels</h1>
      
      <div className="mb-8">
        <SearchBar 
          initialQuery={initialQuery}
          initialSearchType={searchType}
          onSearch={handleSearch}
          className="w-full max-w-3xl mx-auto"
        />
      </div>

      {isLoading && (
        <div className="text-center text-gray-400">Searching channels...</div>
      )}

      {error && (
        <div className="text-center text-red-400">Error searching channels. Please try again.</div>
      )}

      {channels && channels.length === 0 && debouncedQuery && (
        <div className="text-center py-8 bg-[#3d3d3d] rounded-lg">
          <p className="text-xl text-gray-300">No channels found for "{debouncedQuery}"</p>
        </div>
      )}

      {channels && channels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel: any) => (
            <div 
              key={channel.id} 
              className="bg-[#3d3d3d] rounded-lg overflow-hidden hover:bg-[#484848] transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl"
            >
              {channel.thumbnail_url && (
                <img 
                  src={channel.thumbnail_url} 
                  alt={channel.display_name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{channel.display_name}</h3>
                <p className="text-gray-300 mb-2">{channel.game_name}</p>
                <p className="text-sm text-gray-400 line-clamp-2">{channel.title}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-gray-300">
                    {channel.is_live ? '🔴 Live' : '⚫ Offline'}
                  </span>
                  {channel.is_live && (
                    <span className="text-gray-300">
                      👥 {channel.broadcaster_language}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}