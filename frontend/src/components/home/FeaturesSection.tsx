"use client";

import Link from "next/link";
import {
  Plane,
  Hotel,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function FeaturesSection() {
  const services = [
    {
      icon: <Plane size={24} />,
      title: "Flights",
      description: "Best deals from 500+ airlines",
      href: "/flights",
      gradient: "from-sky-500 to-blue-600",
    },
    {
      icon: <Hotel size={24} />,
      title: "Hotels",
      description: "Curated stays worldwide",
      href: "/hotels",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: <Calendar size={24} />,
      title: "Itineraries",
      description: "AI-crafted day-by-day plans",
      href: "/explore",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: <MapPin size={24} />,
      title: "Experiences",
      description: "Local hidden gems",
      href: "/destinations",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <section className="relative py-16 bg-[#EEEEEE] z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/10 text-[#00ADB5] rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            How It Works
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#222831] mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-[#393E46] max-w-2xl mx-auto">
            From planning to exploring, we&apos;ve got every aspect of your
            journey covered
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, i) => (
            <Link
              key={`service-${i}`}
              href={service.href}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#EEEEEE] overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`}
              />
              <div
                className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-[#222831] mb-1">
                {service.title}
              </h3>
              <p className="text-[#393E46] text-sm mb-4">
                {service.description}
              </p>
              <div className="flex items-center gap-1 text-[#00ADB5] text-sm font-medium group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#222831] to-[#393E46] rounded-3xl p-8 lg:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ADB5]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00ADB5]/10 rounded-full blur-2xl" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Ready to Start Planning?
              </h3>
              <p className="text-white/70 max-w-lg">
                Tell our AI about your dream vacation and get a personalized
                itinerary in seconds.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00ADB5] text-white rounded-full font-semibold text-lg hover:bg-[#00c4cc] transition-all duration-300 shadow-lg whitespace-nowrap"
            >
              <Sparkles size={20} />
              Try AI Planner
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
