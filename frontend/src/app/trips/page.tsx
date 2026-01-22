"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  Plane,
  Hotel,
  DollarSign,
  Plus,
  Eye,
  Trash2,
  Sparkles,
  Luggage,
} from "lucide-react";

const mockTrips = [
  {
    id: 1,
    destination: "Paris, France",
    emoji: "🗼",
    image: "/paris.jpg",
    dates: "Mar 15 - Mar 22, 2025",
    status: "upcoming",
    budget: "$2,500",
    spent: "$1,850",
    flights: 2,
    hotels: 1,
    activities: 8,
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    emoji: "🗾",
    image: "/tokyo.jpeg",
    dates: "Apr 5 - Apr 15, 2025",
    status: "planning",
    budget: "$4,000",
    spent: "$0",
    flights: 0,
    hotels: 0,
    activities: 0,
  },
  {
    id: 3,
    destination: "Bali, Indonesia",
    emoji: "🏝️",
    image: "/bali.jpeg",
    dates: "Dec 20 - Dec 30, 2024",
    status: "completed",
    budget: "$3,000",
    spent: "$2,750",
    flights: 2,
    hotels: 2,
    activities: 12,
  },
  {
    id: 4,
    destination: "London, UK",
    emoji: "🇬🇧",
    image: "/big_ben.jpg",
    dates: "May 10 - May 17, 2025",
    status: "planning",
    budget: "$3,500",
    spent: "$0",
    flights: 0,
    hotels: 0,
    activities: 0,
  },
  {
    id: 5,
    destination: "Cappadocia, Turkey",
    emoji: "🎈",
    image: "/hotariballoons.jpg",
    dates: "Jun 1 - Jun 8, 2025",
    status: "upcoming",
    budget: "$2,200",
    spent: "$1,200",
    flights: 2,
    hotels: 1,
    activities: 5,
  },
];

export default function TripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState(mockTrips);
  const [filter, setFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredTrips =
    filter === "all" ? trips : trips.filter((t) => t.status === filter);

  const handleDelete = (id: number) => {
    setTrips(trips.filter((t) => t.id !== id));
    setDeleteId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-[#00ADB5]/10 text-[#00ADB5]";
      case "planning":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner with Background Image */}
      <div className="relative py-32 pt-40 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/amsterdam.jpg"
            alt="Trips background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="absolute top-10 right-20 animate-float-slow hidden lg:block z-10">
          <span className="text-6xl">🧳</span>
        </div>
        <div
          className="absolute bottom-10 left-20 animate-float hidden lg:block z-10"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-4xl">🗺️</span>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <Luggage size={16} />
            Your Adventures
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            My Trips
          </h1>
          <p className="text-xl text-[#EEEEEE]/90 max-w-2xl mx-auto">
            Manage all your travel plans in one place
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Trips", value: trips.length, icon: Plane },
            {
              label: "Upcoming",
              value: trips.filter((t) => t.status === "upcoming").length,
              icon: Calendar,
            },
            { label: "Countries", value: "3", icon: MapPin },
          ].map((stat, i) => (
            <div
              key={i}
              className="card p-4 flex items-center gap-3 opacity-0 animate-slide-up"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="p-3 bg-[#00ADB5]/10 rounded-xl">
                <stat.icon size={24} className="text-[#00ADB5]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#222831]">
                  {stat.value}
                </p>
                <p className="text-sm text-[#393E46]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Filter and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {["all", "upcoming", "planning", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  filter === f
                    ? "bg-[#00ADB5] text-white"
                    : "bg-white text-[#393E46] hover:bg-[#00ADB5]/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Link
            href="/trips/new"
            className="btn-primary flex items-center gap-2 px-5 py-3 rounded-xl"
          >
            <Plus size={18} />
            Plan New Trip
          </Link>
        </div>

        {/* Trips List */}
        <div className="space-y-4">
          {filteredTrips.map((trip, index) => (
            <div
              key={trip.id}
              className="card p-6 card-hover opacity-0 animate-slide-up group"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Trip Image */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 relative">
                  <Image
                    src={trip.image}
                    alt={trip.destination}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#222831]">
                      {trip.destination}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.status)}`}
                    >
                      {trip.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#393E46]">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-[#00ADB5]" />
                      {trip.dates}
                    </span>
                    <span className="flex items-center gap-1">
                      <Plane size={14} className="text-[#00ADB5]" />
                      {trip.flights} Flights
                    </span>
                    <span className="flex items-center gap-1">
                      <Hotel size={14} className="text-[#00ADB5]" />
                      {trip.hotels} Hotels
                    </span>
                  </div>
                </div>

                {/* Budget */}
                <div className="text-right">
                  <p className="text-sm text-[#393E46]">Budget</p>
                  <p className="text-xl font-bold text-[#00ADB5]">
                    {trip.budget}
                  </p>
                  <p className="text-xs text-[#393E46]">Spent: {trip.spent}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/trips/${trip.id}`}
                    className="p-3 bg-[#00ADB5]/10 text-[#00ADB5] rounded-xl hover:bg-[#00ADB5] hover:text-white transition-all"
                  >
                    <Eye size={18} />
                  </Link>
                  <button
                    onClick={() => setDeleteId(trip.id)}
                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div
            className="text-center py-16 opacity-0 animate-fade-in"
            style={{ animationFillMode: "forwards" }}
          >
            <Sparkles size={48} className="text-[#00ADB5] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#222831] mb-2">
              No trips found
            </h3>
            <p className="text-[#393E46]">
              Start planning your next adventure!
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-xl font-bold text-[#222831] mb-2">
              Delete Trip?
            </h3>
            <p className="text-[#393E46] mb-6">
              Are you sure you want to delete this trip? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-6 py-3 rounded-xl text-[#393E46] hover:bg-[#EEEEEE] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Delete Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
