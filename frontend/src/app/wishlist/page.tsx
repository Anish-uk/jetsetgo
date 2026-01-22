"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Star,
  Trash2,
  Calendar,
  DollarSign,
  Sparkles,
  Plane,
} from "lucide-react";

const mockWishlist = [
  {
    id: 1,
    name: "Cappadocia",
    country: "Turkey",
    emoji: "🎈",
    image: "/hotariballoons.jpg",
    rating: 4.9,
    price: "$1,299",
    savedOn: "Feb 10, 2025",
  },
  {
    id: 2,
    name: "Maldives",
    country: "Maldives",
    emoji: "🏝️",
    image: "/beach.jpg",
    rating: 4.8,
    price: "$2,199",
    savedOn: "Feb 8, 2025",
  },
  {
    id: 3,
    name: "Swiss Alps",
    country: "Switzerland",
    emoji: "🏔️",
    image: "/alps.jpg",
    rating: 4.9,
    price: "$1,899",
    savedOn: "Feb 5, 2025",
  },
  {
    id: 4,
    name: "Egypt",
    country: "Egypt",
    emoji: "🏛️",
    image: "/egypt.jpg",
    rating: 4.7,
    price: "$1,599",
    savedOn: "Jan 28, 2025",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("jetsetgo-wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch {
        // If parsing fails, use mock data
        setWishlist(mockWishlist);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("jetsetgo-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const removeItem = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const totalEstimated = wishlist.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    return acc + price;
  }, 0);

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner with Background Image */}
      <div className="relative py-32 pt-40 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/beach.jpg"
            alt="Wishlist background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="absolute top-10 right-20 animate-float-slow hidden lg:block z-10">
          <span className="text-6xl">💖</span>
        </div>
        <div
          className="absolute bottom-10 left-20 animate-float hidden lg:block z-10"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-4xl">⭐</span>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <Heart size={16} className="fill-current" />
            Saved Places
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            My Wishlist
          </h1>
          <p className="text-xl text-[#EEEEEE]/90 max-w-2xl mx-auto">
            Your dream destinations saved for later
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div
          className="card p-4 flex items-center justify-center gap-8 opacity-0 animate-slide-up"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-[#00ADB5] fill-current" />
            <span className="text-lg font-semibold text-[#222831]">
              {wishlist.length}
            </span>
            <span className="text-[#393E46]">saved destinations</span>
          </div>
          <div className="h-6 w-px bg-[#EEEEEE]" />
          <div className="flex items-center gap-2">
            <DollarSign size={20} className="text-[#00ADB5]" />
            <span className="text-lg font-semibold text-[#222831]">
              ${totalEstimated.toLocaleString()}
            </span>
            <span className="text-[#393E46]">total estimated</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlist.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item, index) => (
              <div
                key={item.id}
                className="card rounded-2xl overflow-hidden card-hover opacity-0 animate-slide-up group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                {/* Header with Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-[#00ADB5] text-white px-2 py-1 rounded-lg text-xs">
                    <Star size={12} className="fill-current" />
                    {item.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#222831] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#393E46] flex items-center gap-1 mb-3">
                    <MapPin size={12} className="text-[#00ADB5]" />
                    {item.country}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#EEEEEE] mb-3">
                    <span className="text-xs text-[#393E46] flex items-center gap-1">
                      <Calendar size={12} />
                      Saved {item.savedOn}
                    </span>
                    <span className="text-lg font-bold text-[#00ADB5]">
                      {item.price}
                    </span>
                  </div>
                  <Link
                    href={`/explore?destination=${encodeURIComponent(item.name)}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#00ADB5] text-white rounded-xl hover:bg-[#00ADB5]/90 transition-all text-sm font-medium"
                  >
                    <Plane size={16} />
                    Plan Trip
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 opacity-0 animate-fade-in"
            style={{ animationFillMode: "forwards" }}
          >
            <Sparkles size={48} className="text-[#00ADB5] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#222831] mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-[#393E46] mb-6">
              Start exploring and save your dream destinations!
            </p>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ADB5] text-white rounded-xl hover:bg-[#00ADB5]/90 transition-all"
            >
              <Sparkles size={18} />
              Explore Destinations
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
