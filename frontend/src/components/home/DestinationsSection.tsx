"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DestinationsSection() {
  const destinations = [
    { name: "Paris", country: "France", image: "/paris.jpg", price: "$899" },
    { name: "Tokyo", country: "Japan", image: "/tokyo.jpeg", price: "$1,299" },
    { name: "Bali", country: "Indonesia", image: "/bali.jpeg", price: "$699" },
    { name: "New York", country: "USA", image: "/new_york.jpg", price: "$599" },
  ];

  return (
    <section className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#222831] mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-[#393E46] max-w-xl">
              Explore trending destinations loved by travelers worldwide
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-[#00ADB5] font-semibold mt-4 md:mt-0 hover:gap-3 transition-all"
          >
            View all destinations
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <Link
              key={`dest-${i}`}
              href={`/explore?destination=${encodeURIComponent(dest.name)}`}
              className="group cursor-pointer block"
            >
              <div className="relative h-72 rounded-2xl overflow-hidden mb-4 shadow-lg">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={85}
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222831]/90 via-[#222831]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-[#00ADB5] font-bold text-lg mb-1">
                    from {dest.price}
                  </p>
                  <h3 className="text-2xl font-bold">{dest.name}</h3>
                  <p className="text-white/70">{dest.country}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
