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

export const searchChannels = async (query: string) => {
    const accessToken = await getTwitchAccessToken();
    
    try {
      const channelsResponse = await axios.get('https://api.twitch.tv/helix/search/channels', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!
        },
        params: { query }
      });
  
      // Get additional data for live channels
      const liveChannelLogins = channelsResponse.data.data
        .filter((channel: any) => channel.is_live)
        .map((channel: any) => channel.broadcaster_login);
  
      if (liveChannelLogins.length > 0) {
        const streamsResponse = await axios.get('https://api.twitch.tv/helix/streams', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!
          },
          params: { user_login: liveChannelLogins }
        });
  
        // Merge stream data with channel data
        const streamData = new Map(
          streamsResponse.data.data.map((stream: any) => [stream.user_login, stream])
        );
  
        return channelsResponse.data.data.map((channel: any) => ({
          ...channel,
          streamData: streamData.get(channel.broadcaster_login) || null
        }));
      }
  
      return channelsResponse.data.data;
    } catch (error) {
      console.error('Failed to fetch channels', error);
      throw error;
    }
  };