"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Globe,
  Search,
  MapPin,
  Star,
  Heart,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    emoji: "🗼",
    image: "/paris.jpg",
    rating: 4.9,
    trips: "2.5M+",
    price: "$899",
    description:
      "The City of Light awaits with iconic landmarks, world-class cuisine, and romantic ambiance.",
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    emoji: "🗾",
    image: "/tokyo.jpeg",
    rating: 4.8,
    trips: "3.1M+",
    price: "$1,299",
    description:
      "Experience the perfect blend of ancient traditions and cutting-edge technology.",
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    emoji: "🏝️",
    image: "/bali.jpeg",
    rating: 4.7,
    trips: "1.8M+",
    price: "$699",
    description:
      "Tropical paradise with stunning beaches, lush rice terraces, and spiritual temples.",
  },
  {
    id: 4,
    name: "New York",
    country: "USA",
    emoji: "🗽",
    image: "/new_york.jpg",
    rating: 4.6,
    trips: "4.2M+",
    price: "$599",
    description:
      "The city that never sleeps offers endless entertainment, culture, and iconic sights.",
  },
  {
    id: 5,
    name: "Dubai",
    country: "UAE",
    emoji: "🏜️",
    image: "/dubai.jpg",
    rating: 4.8,
    trips: "2.1M+",
    price: "$1,099",
    description:
      "Ultra-modern architecture meets Arabian heritage in this desert oasis.",
  },
  {
    id: 6,
    name: "Rome",
    country: "Italy",
    emoji: "🏛️",
    image: "/rome.jpg",
    rating: 4.9,
    trips: "1.9M+",
    price: "$799",
    description:
      "Walk through history in the Eternal City with ancient ruins and Renaissance art.",
  },
  {
    id: 7,
    name: "Sydney",
    country: "Australia",
    emoji: "🦘",
    image: "/sydney.jpg",
    rating: 4.7,
    trips: "1.5M+",
    price: "$1,199",
    description:
      "Iconic harbor, stunning beaches, and vibrant culture await Down Under.",
  },
  {
    id: 8,
    name: "Singapore",
    country: "Singapore",
    emoji: "🌴",
    image: "/singapore.jpg",
    rating: 4.8,
    trips: "2.3M+",
    price: "$899",
    description:
      "A futuristic city-state with incredible food, shopping, and attractions.",
  },
  {
    id: 9,
    name: "London",
    country: "United Kingdom",
    emoji: "🇬🇧",
    image: "/big_ben.jpg",
    rating: 4.8,
    trips: "3.5M+",
    price: "$749",
    description:
      "Historic landmarks, royal palaces, and world-class museums await in this iconic city.",
  },
  {
    id: 10,
    name: "Cappadocia",
    country: "Turkey",
    emoji: "🎈",
    image: "/hotariballoons.jpg",
    rating: 4.9,
    trips: "1.2M+",
    price: "$649",
    description:
      "Magical hot air balloon rides over fairy chimneys and ancient cave dwellings.",
  },
  {
    id: 11,
    name: "Egypt",
    country: "Egypt",
    emoji: "🏺",
    image: "/egypt.jpg",
    rating: 4.7,
    trips: "2.0M+",
    price: "$599",
    description:
      "Ancient pyramids, pharaohs, and the mysteries of the Nile await discovery.",
  },
  {
    id: 12,
    name: "Amsterdam",
    country: "Netherlands",
    emoji: "🌷",
    image: "/amsterdam.jpg",
    rating: 4.6,
    trips: "1.8M+",
    price: "$699",
    description:
      "Picturesque canals, world-famous museums, and vibrant culture in every corner.",
  },
];

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner with Background Image */}
      <div className="relative py-32 pt-40 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/beautiful_city.jpg"
            alt="Destinations background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 right-20 animate-float-slow hidden lg:block z-10">
          <span className="text-6xl">🌍</span>
        </div>
        <div
          className="absolute bottom-10 left-20 animate-float hidden lg:block z-10"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-4xl">✈️</span>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <Sparkles size={16} />
            Explore the World
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Discover Amazing Destinations
          </h1>
          <p className="text-xl text-[#EEEEEE]/90 max-w-2xl mx-auto mb-8">
            Find your next adventure from our curated collection of the world's
            most incredible places
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E46]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-[#222831] placeholder-[#393E46]/50 shadow-xl focus:ring-4 focus:ring-[#00ADB5]/20 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Badge */}
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp size={20} className="text-[#00ADB5]" />
          <span className="text-lg font-semibold text-[#222831]">
            Trending Destinations
          </span>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest, index) => (
            <div
              key={dest.id}
              className="card rounded-2xl overflow-hidden card-hover opacity-0 animate-slide-up group"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button
                  onClick={() => toggleFavorite(dest.id)}
                  className={`absolute top-3 right-3 p-2 rounded-xl transition-all ${
                    favorites.includes(dest.id)
                      ? "bg-[#00ADB5] text-white"
                      : "bg-white/90 text-[#393E46] hover:bg-[#00ADB5] hover:text-white"
                  }`}
                >
                  <Heart
                    size={16}
                    className={
                      favorites.includes(dest.id) ? "fill-current" : ""
                    }
                  />
                </button>
                <div className="absolute bottom-3 left-3 text-3xl">
                  {dest.emoji}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#222831]">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-[#393E46] flex items-center gap-1">
                      <MapPin size={12} className="text-[#00ADB5]" />
                      {dest.country}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#00ADB5]/10 px-2 py-1 rounded-lg">
                    <Star
                      size={14}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="text-sm font-semibold text-[#222831]">
                      {dest.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#393E46] mb-4 line-clamp-2">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#EEEEEE]">
                  <span className="text-xs text-[#393E46]">
                    {dest.trips} travelers
                  </span>
                  <span className="text-lg font-bold text-[#00ADB5]">
                    from {dest.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
