"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  Hotel,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Sparkles,
  Ticket,
  Trash2,
} from "lucide-react";

interface Booking {
  id: string;
  type: string;
  title: string;
  emoji: string;
  date: string;
  time: string;
  status: string;
  price: string;
  details: string;
  location?: string;
}

const mockBookings: Booking[] = [
  {
    id: "BK001",
    type: "flight",
    title: "Paris to New York",
    emoji: "🗽",
    date: "Mar 15, 2025",
    time: "10:30 AM",
    status: "confirmed",
    price: "$650",
    details: "Air France AF123 - Economy",
  },
  {
    id: "BK002",
    type: "hotel",
    title: "The Plaza Hotel",
    emoji: "🏨",
    date: "Mar 15 - Mar 22, 2025",
    time: "Check-in 3:00 PM",
    status: "confirmed",
    price: "$1,200",
    details: "Deluxe Room - 7 nights",
  },
  {
    id: "BK003",
    type: "flight",
    title: "New York to Paris",
    emoji: "🗼",
    date: "Mar 22, 2025",
    time: "8:00 PM",
    status: "pending",
    price: "$580",
    details: "Air France AF456 - Economy",
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filter, setFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("jetsetgo-bookings");
    if (savedBookings) {
      try {
        const parsed = JSON.parse(savedBookings);
        setBookings([...mockBookings, ...parsed]);
      } catch {
        setBookings(mockBookings);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleCancelBooking = (id: string) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
    );
    // Update localStorage
    const savedBookings = localStorage.getItem("jetsetgo-bookings");
    if (savedBookings) {
      const parsed = JSON.parse(savedBookings);
      const updated = parsed.map((b: Booking) =>
        b.id === id ? { ...b, status: "cancelled" } : b,
      );
      localStorage.setItem("jetsetgo-bookings", JSON.stringify(updated));
    }
  };

  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.type === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={16} className="text-green-500" />;
      case "pending":
        return <AlertCircle size={16} className="text-yellow-500" />;
      case "cancelled":
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner with Background Image */}
      <div className="relative py-32 pt-40 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hogwrats_like_city.jpg"
            alt="Bookings background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="absolute top-10 right-20 animate-float-slow hidden lg:block z-10">
          <span className="text-6xl">🎫</span>
        </div>
        <div
          className="absolute bottom-10 left-20 animate-float hidden lg:block z-10"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-4xl">📋</span>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <Ticket size={16} />
            Travel Reservations
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            My Bookings
          </h1>
          <p className="text-xl text-[#EEEEEE]/90 max-w-2xl mx-auto">
            View and manage all your travel reservations
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Bookings", value: bookings.length, icon: Ticket },
            {
              label: "Flights",
              value: bookings.filter((b) => b.type === "flight").length,
              icon: Plane,
            },
            {
              label: "Hotels",
              value: bookings.filter((b) => b.type === "hotel").length,
              icon: Hotel,
            },
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
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "flight", "hotel", "experience"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-[#00ADB5] text-white"
                  : "bg-white text-[#393E46] hover:bg-[#00ADB5]/10"
              }`}
            >
              {f === "all" ? "All Bookings" : f + "s"}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => (
            <div
              key={booking.id}
              className="card p-6 card-hover opacity-0 animate-slide-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-[#222831] to-[#393E46] rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  {booking.emoji}
                </div>

                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-[#222831]">
                      {booking.title}
                    </h3>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-xs capitalize">
                      {getStatusIcon(booking.status)}
                      <span>{booking.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#393E46] mb-2">
                    {booking.details}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#393E46]">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-[#00ADB5]" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-[#00ADB5]" />
                      {booking.time}
                    </span>
                    {booking.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-[#00ADB5]" />
                        {booking.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-[#393E46]">Total</p>
                    <p className="text-xl font-bold text-[#00ADB5]">
                      {booking.price}
                    </p>
                  </div>
                  <button className="p-3 bg-[#00ADB5]/10 text-[#00ADB5] rounded-xl hover:bg-[#00ADB5] hover:text-white transition-all">
                    <Download size={18} />
                  </button>
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div
            className="text-center py-16 opacity-0 animate-fade-in"
            style={{ animationFillMode: "forwards" }}
          >
            <Sparkles size={48} className="text-[#00ADB5] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#222831] mb-2">
              No bookings found
            </h3>
            <p className="text-[#393E46] mb-6">
              Your reservations will appear here.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ADB5] text-white rounded-xl hover:bg-[#00ADB5]/90 transition-all"
            >
              <Sparkles size={18} />
              Explore Experiences
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
