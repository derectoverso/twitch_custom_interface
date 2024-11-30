// src/app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-purple-600 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Twitch Dashboard
      </h1>
      
      <div className="grid gap-4 w-full max-w-md">
        <Link 
          href="/streams" 
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-300"
        >
          Live Streams
        </Link>
        
        <Link 
          href="/search-clips" 
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-300"
        >
          Search Clips
        </Link>
        
        <Link 
          href="/search-channels" 
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-300"
        >
          Search Channels
        </Link>
      </div>
    </div>
  )
}