// app/page.tsx
import Link from 'next/link';
import { Bookmark, Share2, Heart } from 'lucide-react';

export const dynamic = 'force-static';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Save and Share Web Links in One Place
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-12">
              ClipVault helps you organize web content and
              <br />
              share it effortlessly with others.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/home"
                className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors inline-block"
              >
                Get Started
              </Link>
              <button className="px-8 py-4 bg-zinc-800 text-white rounded-lg font-semibold text-lg border border-zinc-700 hover:border-purple-500 transition-colors">
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Web Link Management</h2>
            <p className="text-zinc-400 text-lg">Discover the core features of ClipVault</p>
          </div>

          <div className="space-y-32">
            {/* First Feature */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <div className="max-w-sm w-full">
                  <img
                    src="/api/placeholder/480/800"
                    alt="Clip Saving Feature"
                    className="w-full rounded-2xl border border-zinc-700"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Bookmark className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Save with Clips</h3>
                </div>
                <p className="text-zinc-300 mb-6 text-lg leading-relaxed">
                  Organize web links by categories and manage them with public/private settings. Each clip can have a
                  title, URL, and category for systematic organization.
                </p>
                <ul className="space-y-4 text-zinc-400">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                    Organize with categories
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                    Control privacy settings
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                    Add custom titles and descriptions
                  </li>
                </ul>
              </div>
            </div>

            {/* Second Feature */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Discover and Fork</h3>
                </div>
                <p className="text-zinc-300 mb-6 text-lg leading-relaxed">
                  Explore public clips from other users in the home feed. Fork interesting clips to add them to your own
                  collection.
                </p>
                <ul className="space-y-4 text-zinc-400">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    Real-time home feed updates
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    One-click forking
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    Browse by categories
                  </li>
                </ul>
              </div>
              <div className="flex justify-center order-2">
                <div className="max-w-sm w-full">
                  <img
                    src="/api/placeholder/480/800"
                    alt="Home Feed and Fork Feature"
                    className="w-full rounded-2xl border border-zinc-700"
                  />
                </div>
              </div>
            </div>

            {/* Third Feature */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <div className="max-w-sm w-full">
                  <img
                    src="/api/placeholder/480/800"
                    alt="Share Link Feature"
                    className="w-full rounded-2xl border border-zinc-700"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Time-Limited Sharing</h3>
                </div>
                <p className="text-zinc-300 mb-6 text-lg leading-relaxed">
                  Share your clip collections with time-limited links. Set expiration periods from 1 to 30 days and
                  share with anyone.
                </p>
                <ul className="space-y-4 text-zinc-400">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                    Flexible expiration periods
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                    Share with non-members
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                    Real-time link management
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Using ClipVault Today</h2>
          <p className="text-xl text-purple-100 mb-8">Experience smart web link management with ClipVault</p>
          <Link
            href="/home"
            className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
