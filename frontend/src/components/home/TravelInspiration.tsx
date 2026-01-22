"use client";

import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";

const travelCategories = [
  {
    title: "Beach Paradise",
    description: "Crystal clear waters and golden sands await",
    image: "/beach.jpg",
    destinations: ["Bali", "Maldives", "Santorini"],
  },
  {
    title: "Mountain Adventures",
    description: "Conquer peaks and breathe fresh alpine air",
    image: "/alps.jpg",
    destinations: ["Swiss Alps", "Himalayas", "Rockies"],
  },
  {
    title: "Ancient Wonders",
    description: "Explore the mysteries of ancient civilizations",
    image: "/egypt.jpg",
    destinations: ["Egypt", "Rome", "Athens"],
  },
  {
    title: "Aerial Adventures",
    description: "See the world from breathtaking heights",
    image: "/hotariballoons.jpg",
    destinations: ["Cappadocia", "Dubai", "Queenstown"],
  },
];

export default function TravelInspiration() {
  return (
    <section className="py-20 bg-[#EEEEEE] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#222831] mb-4">
            Find Your Perfect Escape
          </h2>
          <p className="text-lg text-[#393E46] max-w-2xl mx-auto">
            Whether you seek relaxation or adventure, we have the perfect
            destination for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelCategories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-80 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={85}
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.destinations.map((dest, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full"
                      >
                        <MapPin size={10} />
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 text-[#00ADB5] font-medium group-hover:gap-4 transition-all">
                Explore {category.title}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
