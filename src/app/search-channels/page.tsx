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

  const liveChannels = channels?.filter(channel => channel.is_live) || [];
  const offlineChannels = channels?.filter(channel => !channel.is_live) || [];

  const ChannelGrid = ({ channel }: { channel: any }) => (
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
      <div className="p-4 flex flex-col" style={{ minHeight: '200px' }}>
        <div>
          <h3 className="font-bold text-xl mb-2">{channel.display_name}</h3>
          <p className="text-gray-300 mb-2">{channel.game_name}</p>
          <p className="text-sm text-gray-400 line-clamp-2">{channel.title}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className={`${channel.is_live ? 'text-red-500' : 'text-gray-500'}`}>
            {channel.is_live ? '🔴 Live' : '⚫ Offline'}
          </span>
          {channel.is_live && (
            <span className="text-gray-300">
              👥 {channel.broadcaster_language}
            </span>
          )}
          <span className="text-gray-300">
            ❤️ {channel.follower_count?.toLocaleString() ?? '0'}
          </span>
        </div>
      </div>
    </div>
  );

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
                {liveChannels.map((channel) => (
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
                {offlineChannels.map((channel) => (
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