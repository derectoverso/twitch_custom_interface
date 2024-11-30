// src/components/ChannelGrid.tsx
'use client';

import { useRouter } from 'next/navigation';

const ChannelGrid = ({ channel }: { channel: any }) => {
  const router = useRouter();

   // Format duration
   const formatDuration = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    const duration = now.getTime() - start.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  
  // Format time to match Twitch style (e.g., "08:27:08")
  const formatStartTime = (startTime: string) => {
    return new Date(startTime).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format viewers to match Twitch style (e.g., "377")
  const formatViewers = (count: number) => {
    return count.toLocaleString();
  };

  const handleChannelClick = () => {
    const channelName = channel.broadcaster_login;
    const queryParams = new URLSearchParams({
      avatar: channel.thumbnail_url,
      title: channel.title,
      game: channel.game_name,
      tags: channel.tags?.join(',') || '',
    }).toString();
  
    if (channel.is_live) {
      router.push(`/channel/${channelName}/live?${queryParams}`);
    } else {
      router.push(`/channel/${channelName}?${queryParams}`);
    }
  };

  return (
    <div 
      onClick={handleChannelClick}
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

          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl mb-2">{channel.display_name}</h3>
            {channel.broadcaster_language && (
              <span className="text-gray-300">
                🌐 {channel.broadcaster_language.toUpperCase()}
              </span>
            )}
          </div>

          <div className="mt-2 pb-2">
            <p className="text-sm text-gray-400 line-clamp-2">{channel.title}</p>
          </div>

          {/* Tags row */}
          {channel.tags && channel.tags.length > 0 && (
            <div className="mt-4 pb-4 border-b border-[#2d2d2d]">
              <div className="flex flex-wrap gap-2">
                {channel.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}         
  
          {/* Stream info for live channels */}
          {channel.is_live && channel.streamData && (
            <div className="mt-2 pb-2 border-b border-[#2d2d2d]">
              <div className="flex items-center justify-between text-gray-300 text-sm">
                <span>🕛 {formatStartTime(channel.streamData.started_at)}</span>
                <span>⌛ {formatDuration(channel.streamData.started_at)}</span>
                <span>👀 {formatViewers(channel.streamData.viewer_count)}</span>
              </div>
            </div>
          )}
          
          {/* Status and stats row */}
          <div className="mt-2 flex items-center justify-between">
            <span className={`${channel.is_live ? 'text-red-500' : 'text-gray-500'}`}>
              {channel.is_live ? '🔴 Live' : '⚫ Offline'}
            </span>
            <span className="text-gray-300 flex items-center">
              🎮 {channel.game_name || 'No Game'}
            </span>
          </div>
        </div>
    </div>
  );
};

export default ChannelGrid;