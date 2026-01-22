"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plane,
  Search,
  Calendar,
  Users,
  ArrowRightLeft,
  Filter,
  SlidersHorizontal,
  Clock,
  Heart,
  MapPin,
  TrendingDown,
} from "lucide-react";

const mockFlights = [
  {
    id: 1,
    airline: "Air India",
    logo: "✈️",
    from: "DEL",
    fromCity: "New Delhi",
    to: "CDG",
    toCity: "Paris",
    departure: "10:30",
    arrival: "18:45",
    duration: "10h 15m",
    stops: 0,
    price: 45999,
    class: "Economy",
  },
  {
    id: 2,
    airline: "Emirates",
    logo: "🛩️",
    from: "BOM",
    fromCity: "Mumbai",
    to: "LHR",
    toCity: "London",
    departure: "02:15",
    arrival: "08:30",
    duration: "9h 45m",
    stops: 1,
    price: 52499,
    class: "Economy",
  },
  {
    id: 3,
    airline: "Singapore Airlines",
    logo: "🌏",
    from: "DEL",
    fromCity: "New Delhi",
    to: "SIN",
    toCity: "Singapore",
    departure: "23:55",
    arrival: "08:10",
    duration: "5h 45m",
    stops: 0,
    price: 28999,
    class: "Economy",
  },
  {
    id: 4,
    airline: "Thai Airways",
    logo: "🇹🇭",
    from: "BLR",
    fromCity: "Bangalore",
    to: "BKK",
    toCity: "Bangkok",
    departure: "14:20",
    arrival: "20:35",
    duration: "4h 15m",
    stops: 0,
    price: 18999,
    class: "Economy",
  },
  {
    id: 5,
    airline: "Qatar Airways",
    logo: "🏆",
    from: "DEL",
    fromCity: "New Delhi",
    to: "JFK",
    toCity: "New York",
    departure: "03:45",
    arrival: "14:30",
    duration: "16h 15m",
    stops: 1,
    price: 78999,
    class: "Business",
  },
];

export default function FlightsPage() {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState("roundtrip");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const swapLocations = () => {
    const temp = searchFrom;
    setSearchFrom(searchTo);
    setSearchTo(temp);
  };

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner with Background Image */}
      <div className="relative py-32 pt-48 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sky_gliding.jpg"
            alt="Flights background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4 animate-fade-in">
            <div className="w-12 h-12 bg-[#00ADB5]/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Plane size={24} className="text-[#00ADB5]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Find Your Perfect Flight
              </h1>
              <p className="text-[#EEEEEE]/70">
                Search and compare flights from hundreds of airlines worldwide
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: <TrendingDown size={18} />, text: "Price Drop Alerts" },
              { icon: <MapPin size={18} />, text: "500+ Airlines" },
              { icon: <Clock size={18} />, text: "24/7 Support" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[#EEEEEE]/80"
              >
                <span className="text-[#00ADB5]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Card */}
        <div className="card rounded-2xl p-6 lg:p-8 -mt-20 relative z-10 mb-8 animate-slide-up">
          {/* Trip Type Toggle */}
          <div className="flex gap-3 mb-6">
            {["roundtrip", "oneway", "multicity"].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  tripType === type
                    ? "bg-[#00ADB5] text-white shadow-lg shadow-[#00ADB5]/30"
                    : "bg-[#EEEEEE] text-[#222831] hover:bg-[#00ADB5]/10"
                }`}
              >
                {type === "roundtrip"
                  ? "Round Trip"
                  : type === "oneway"
                    ? "One Way"
                    : "Multi-City"}
              </button>
            ))}
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* From & To with Swap Button */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4 relative">
              <div>
                <label className="block text-sm font-medium text-[#222831] mb-2">
                  From
                </label>
                <div className="relative">
                  <Plane
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#393E46]"
                  />
                  <input
                    type="text"
                    value={searchFrom}
                    onChange={(e) => setSearchFrom(e.target.value)}
                    placeholder="City or airport"
                    className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE] border-2 border-transparent rounded-xl text-[#222831] placeholder-[#393E46]/50 focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/10 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Swap Button - positioned between From and To */}
              <button
                onClick={swapLocations}
                className="absolute left-1/2 -translate-x-1/2 top-[38px] z-10 w-10 h-10 bg-white border-2 border-[#00ADB5] rounded-full flex items-center justify-center hover:bg-[#00ADB5] hover:text-white transition-all group shadow-md"
              >
                <ArrowRightLeft
                  size={16}
                  className="text-[#00ADB5] group-hover:text-white"
                />
              </button>

              <div>
                <label className="block text-sm font-medium text-[#222831] mb-2">
                  To
                </label>
                <div className="relative">
                  <Plane
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#393E46] rotate-90"
                  />
                  <input
                    type="text"
                    value={searchTo}
                    onChange={(e) => setSearchTo(e.target.value)}
                    placeholder="City or airport"
                    className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE] border-2 border-transparent rounded-xl text-[#222831] placeholder-[#393E46]/50 focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/10 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222831] mb-2">
                {tripType === "roundtrip" ? "Depart - Return" : "Departure"}
              </label>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#393E46]"
                />
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE] border-2 border-transparent rounded-xl text-[#222831] focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222831] mb-2">
                Passengers
              </label>
              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#393E46]"
                />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE] border-2 border-transparent rounded-xl text-[#222831] focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/10 outline-none appearance-none transition-all"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Passenger" : "Passengers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button className="flex items-center gap-2 text-[#393E46] hover:text-[#00ADB5] transition-colors">
              <SlidersHorizontal size={18} />
              <span className="font-medium">Advanced Filters</span>
            </button>
            <button className="btn-primary px-10 py-3.5 rounded-xl font-semibold flex items-center gap-2 w-full sm:w-auto justify-center">
              <Search size={18} />
              Search Flights
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-[#222831]">
            <Filter size={18} />
            <span className="font-medium">Sort by:</span>
          </div>
          {["Cheapest", "Fastest", "Best Value"].map((sort, i) => (
            <button
              key={sort}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                i === 0
                  ? "bg-[#00ADB5] text-white shadow-lg shadow-[#00ADB5]/30"
                  : "bg-white border-2 border-[#EEEEEE] text-[#222831] hover:border-[#00ADB5]"
              }`}
            >
              {sort}
            </button>
          ))}
        </div>

        {/* Flight Results */}
        <div className="space-y-4">
          {mockFlights.map((flight, index) => (
            <div
              key={flight.id}
              className="card rounded-xl p-6 card-hover opacity-0 animate-slide-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Airline Info */}
                <div className="flex items-center gap-4 lg:w-48">
                  <div className="w-14 h-14 bg-[#00ADB5]/10 rounded-xl flex items-center justify-center text-3xl">
                    {flight.logo}
                  </div>
                  <div>
                    <p className="font-semibold text-[#222831]">
                      {flight.airline}
                    </p>
                    <p className="text-sm text-[#393E46]">{flight.class}</p>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="flex-1 flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#222831]">
                      {flight.departure}
                    </p>
                    <p className="text-sm font-medium text-[#00ADB5]">
                      {flight.from}
                    </p>
                    <p className="text-xs text-[#393E46]">{flight.fromCity}</p>
                  </div>

                  <div className="flex-1 px-4">
                    <div className="text-center mb-2">
                      <p className="text-sm text-[#393E46] flex items-center justify-center gap-1">
                        <Clock size={14} />
                        {flight.duration}
                      </p>
                    </div>
                    <div className="relative flex items-center">
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-[#00ADB5]/20 via-[#00ADB5] to-[#00ADB5]/20" />
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium ${
                          flight.stops === 0
                            ? "bg-green-100 text-green-600"
                            : "bg-[#EEEEEE] text-[#393E46]"
                        }`}
                      >
                        {flight.stops === 0 ? "Direct" : `${flight.stops} Stop`}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#222831]">
                      {flight.arrival}
                    </p>
                    <p className="text-sm font-medium text-[#00ADB5]">
                      {flight.to}
                    </p>
                    <p className="text-xs text-[#393E46]">{flight.toCity}</p>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center gap-4 lg:border-l lg:border-[#EEEEEE] lg:pl-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#222831]">
                      ₹{flight.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-[#393E46]">per person</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="btn-primary px-6 py-2.5 rounded-xl font-medium">
                      Select
                    </button>
                    <button
                      onClick={() => toggleFavorite(flight.id)}
                      className={`p-2.5 rounded-xl border-2 transition-all ${
                        favorites.includes(flight.id)
                          ? "bg-[#00ADB5]/10 border-[#00ADB5]"
                          : "border-[#EEEEEE] hover:border-[#00ADB5]"
                      }`}
                    >
                      <Heart
                        size={18}
                        className={
                          favorites.includes(flight.id)
                            ? "text-[#00ADB5] fill-[#00ADB5]"
                            : "text-[#393E46]"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
