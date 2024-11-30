// src/app/channel/[channelName]/page.tsx
'use client';

import { useParams, useSearchParams } from 'next/navigation';

export default function ChannelPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const channelName = params.channelName as string;
  
  return (
    <div className="p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{channelName}</h1>
        
        <div className="bg-[#3d3d3d] rounded-lg p-6">
          <div className="flex items-start gap-6">
            {/* Channel Avatar */}
            <img 
              src={searchParams.get('avatar') || '/api/placeholder/128/128'} 
              alt={channelName}
              className="w-32 h-32 rounded-full"
            />
            
            {/* Channel Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{channelName}</h2>
              <p className="text-gray-300 mb-4">{searchParams.get('title')}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {searchParams.get('tags')?.split(',').map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Game */}
              <div className="text-gray-300">
                <span className="mr-2">🎮</span>
                {searchParams.get('game') || 'No Game'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}