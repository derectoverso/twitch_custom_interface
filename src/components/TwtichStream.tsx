// src/components/TwitchStream.tsx
'use client';

import { useState } from 'react';

interface TwitchStreamProps {
  username: string;
  width?: number;
  height?: number;
}

export const TwitchStream = ({ 
  username, 
  width = 400, 
  height = 300 
}: TwitchStreamProps) => {
  return (
    <div className="relative">
      <iframe
        src={`https://player.twitch.tv/?channel=${username}&parent=localhost`}
        height={height}
        width={width}
        allowFullScreen
        className="border border-gray-300"
      />
    </div>
  );
};