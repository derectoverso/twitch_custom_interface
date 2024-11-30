// src/app/channel/[channelName]/live/page.tsx
'use client';

import { useParams } from 'next/navigation';

export default function LiveChannelPage() {
  const params = useParams();
  const channelName = params.channelName as string;

  return (
    <div className="flex h-screen bg-[#0E0E10]">
      {/* Main content - Video Player */}
      <div className="flex-1 flex flex-col">
        <div className="relative w-full" style={{ height: 'calc(100vh - 100px)' }}>
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

        {/* Channel info bar */}
        <div className="h-[100px] bg-[#18181B] border-t border-[#2D2D2D] px-4 py-2">
          <div className="flex items-center h-full">
            <h1 className="text-xl text-white font-bold">{channelName}</h1>
          </div>
        </div>
      </div>

      {/* Chat sidebar */}
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