// src/app/search-channels/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchChannels } from '@/lib/twitch-api';

type SearchType = 'title' | 'game' | 'channel';

export default function SearchChannelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('channel');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: channels, isLoading, error } = useQuery({
    queryKey: ['searchChannels', debouncedQuery, searchType],
    queryFn: () => searchChannels(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  return (
    <div className="min-h-screen bg-purple-600 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Search Channels</h1>
      
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="flex-1 px-4 py-2 rounded-lg bg-purple-700 text-white placeholder-purple-300 border border-purple-500 focus:outline-none focus:border-purple-400"
        />
        
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as SearchType)}
          className="px-4 py-2 rounded-lg bg-purple-700 text-white border border-purple-500 focus:outline-none focus:border-purple-400"
        >
          <option value="channel">Search by Channel</option>
          <option value="title">Search by Title</option>
          <option value="game">Search by Game</option>
        </select>
      </div>

      {isLoading && (
        <div className="text-center text-purple-200">Searching channels...</div>
      )}

      {error && (
        <div className="text-center text-red-300">Error searching channels. Please try again.</div>
      )}

      {channels && channels.length === 0 && searchQuery && (
        <div className="text-center py-8 bg-purple-700/50 rounded-lg">
            <p className="text-xl text-purple-200">No channels found for "{searchQuery}"</p>
        </div>
        )}

    {channels && channels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel: any) => (
            <div 
                key={channel.id} 
                className="bg-purple-700 rounded-lg overflow-hidden hover:bg-purple-800 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl"
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
                <p className="text-purple-200 mb-2">{channel.game_name}</p>
                <p className="text-sm text-purple-300 line-clamp-2">{channel.title}</p>
                <div className="mt-4 flex items-center gap-4">
                    <span className="text-purple-200">
                    {channel.is_live ? '🔴 Live' : '⚫ Offline'}
                    </span>
                    {channel.is_live && (
                    <span className="text-purple-200">
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