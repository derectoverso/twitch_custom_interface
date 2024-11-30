// src/app/channel/[channelName]/live/page.tsx
'use client';

import { useParams, useSearchParams } from 'next/navigation';

export default function LiveChannelPage() {
  const params = useParams();
  const channelName = params.channelName as string;
  const searchParams = useSearchParams();
  
  return (
    <div className="flex h-screen bg-[#0E0E10]">
      {/* Video player section */}
      <div className="flex-1 flex flex-col">
        <div className="relative w-full" style={{ height: 'calc(100vh - 160px)' }}>
          <iframe
            src={`https://player.twitch.tv/?channel=${channelName}&parent=localhost&darkpopout=true`}
            frameBorder="0"
            allowFullScreen
            scrolling="no"
            height="100%"
            width="100%"
            title="Twitch video player"
          />
        </div>

        {/* Info bar */}
        <div className="h-[160px] bg-[#18181B] border-t border-[#2D2D2D] px-4 py-3">
          <div className="flex items-start gap-4">
            {/* Streamer Avatar */}
            <div className="relative w-16 h-16 flex-shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src={searchParams.get('avatar') || '/api/placeholder/64/64'} 
                  alt={channelName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* LIVE badge floating on top of avatar */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[11px] px-1.5 rounded font-medium z-10">
                LIVE
              </div>
            </div>


            {/* Stream Info */}
            <div className="flex-1">
              {/* Channel name and badges row */}
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-white">{channelName}</h1>
                {searchParams.get('partnered') === 'true' && (
                  <svg className="w-4 h-4 text-purple-400" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M3 7.84375L6.59375 11.4375L13.375 4.65625L12.34375 3.625L6.59375 9.375L4.03125 6.8125L3 7.84375Z"/>
                  </svg>
                )}
              </div>

              {/* Stream title */}
              <h3 className="text-lg text-white mb-0">{searchParams.get('title')}</h3>

              <div className="flex justify-bewtween items-center gap-1 mb-2">
                {/* Game name */}
                <div className="text-purple-400">
                  {searchParams.get('game') || 'Unknown Game'}
                </div>
                {/* Viewer count */}
                <span className="text-gray-400 flex items-center ml-4">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                  {searchParams.get('viewers') || '0'} viewers
                </span>
              </div>

              <div className="flex flex-wrap mb-2 gap-2">
                <div className="flex items-center gap-1 text-gray-400">
                  <span>🌐</span>
                  <span>{searchParams.get('language')?.toUpperCase() || 'EN'}</span>
                </div>
                {/* Tags row */}
                {searchParams.get('tags')?.split(',').map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-[#2D2D2D] text-gray-300 px-2 py-0.5 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Chat section */}
      <div className="w-[340px] border-l border-[#2D2D2D] bg-[#18181B]">
        <iframe
          src={`https://www.twitch.tv/embed/${channelName}/chat?parent=localhost&darkpopout=true&darkmode=true`}
          height="100%"
          width="100%"
          title="Twitch chat"
        />
      </div>
    </div>
  );
}