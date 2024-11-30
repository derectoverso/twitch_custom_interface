/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['static-cdn.jtvnw.net', 'player.twitch.tv']
    },
    env: {
      TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
      TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET,
    }
  }
  
  module.exports = nextConfig