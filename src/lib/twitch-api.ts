// src/lib/twitch-api.ts
import axios from 'axios';

export const getTwitchAccessToken = async () => {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get Twitch access token', error);
    throw error;
  }
};

export const fetchTwitchStreams = async (gameId?: string, userName?: string) => {
  const accessToken = await getTwitchAccessToken();
  
  try {
    const response = await axios.get('https://api.twitch.tv/helix/streams', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      },
      params: {
        ...(gameId && { game_id: gameId }),
        ...(userName && { user_login: userName }),
        first: 100 // Adjust as needed
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch Twitch streams', error);
    throw error;
  }
};


export const searchChannels = async (query: string, first: number = 20) => {
    const accessToken = await getTwitchAccessToken();
    
    const url = 'https://api.twitch.tv/helix/search/channels';
    const params = {
      query,
      first,
    };

    console.log('🔍 Twitch API Request:', {
      url,
      params,
      headers: {
        'Authorization': `Bearer ${accessToken.slice(0, 10)}...`, // Only log part of the token for security
        'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
      }
    });
    
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!
        },
        params
      });
      
      const sortedChannels = response.data.data.sort((a: any, b: any) => {
        if (a.is_live && !b.is_live) return -1;
        if (!a.is_live && b.is_live) return 1;
        return b.follower_count - a.follower_count;
      });

      console.log('✅ Twitch API Response:', {
        status: response.status,
        resultCount: sortedChannels.length,
        liveChannels: sortedChannels.filter((c: any) => c.is_live).length
      });
      
      return sortedChannels;
    } catch (error) {
      console.error('❌ Failed to search channels:', error);
      throw error;
    }
  };