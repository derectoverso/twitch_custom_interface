// src/app/channel/[channelName]/layout.tsx
export default function ChannelLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen bg-[#1A1A1A]">
        {children}
      </div>
    );
  }