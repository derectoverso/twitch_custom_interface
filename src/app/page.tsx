// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-start text-white p-4">
      {/* Logo section */}
      <div className="mt-20 mb-16">
        <Image 
          src="/twitch.png" 
          alt="Twitch Logo" 
          width={240} 
          height={240} 
          className="w-auto h-auto"
        />
      </div>
      
      {/* Single search button */}
      <div className="w-full max-w-xl">
        <Link 
          href="/search-channels" 
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-4 px-8 rounded-lg text-center transition-all duration-300 block text-xl hover:transform hover:scale-105 hover:shadow-lg"
        >
          Find something to watch
        </Link>
      </div>
    </div>
  )
}