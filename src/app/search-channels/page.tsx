// src/app/search-channels/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchChannels } from '@/lib/twitch-api';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import ChannelGrid from '@/components/ChannelGrid';
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

  const liveChannels = channels?.filter((channel: any) => channel.is_live) || [];
  const offlineChannels = channels?.filter((channel: any) => !channel.is_live) || [];

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
        <div className="space-y-8">
          {/* Live Channels Section */}
          {liveChannels.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-red-500 mr-2">●</span> Live Channels
                <span className="text-gray-400 ml-2 text-lg">({liveChannels.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveChannels.map((channel: any) => (
                  <ChannelGrid key={channel.id} channel={channel} />
                ))}
              </div>
            </div>
          )}

          {/* Separator if both sections are present */}
          {liveChannels.length > 0 && offlineChannels.length > 0 && (
            <div className="border-t border-[#2d2d2d]"></div>
          )}

          {/* Offline Channels Section */}
          {offlineChannels.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-gray-500 mr-2">●</span> Offline Channels
                <span className="text-gray-400 ml-2 text-lg">({offlineChannels.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offlineChannels.map((channel: any) => (
                  <ChannelGrid key={channel.id} channel={channel} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}