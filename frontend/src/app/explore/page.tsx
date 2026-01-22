"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Heart,
  Star,
  TrendingUp,
  Sun,
  Mountain,
  Palmtree,
  Building,
  Camera,
  Utensils,
  Send,
  Plane,
  Hotel,
  Calendar,
} from "lucide-react";
import { TripPlan } from "@/types";

// Trip Components
import BudgetOverview from "@/components/trip/BudgetOverview";
import FlightCard from "@/components/trip/FlightCard";
import HotelCard from "@/components/trip/HotelCard";
import DayCard from "@/components/trip/DayCard";

const travelStyles = [
  {
    id: 1,
    title: "Adventure Seeker",
    description: "Thrilling experiences and outdoor activities",
    icon: <Mountain size={32} />,
    image: "/alps.jpg",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 2,
    title: "Beach Lover",
    description: "Sun, sand, and crystal-clear waters",
    icon: <Palmtree size={32} />,
    image: "/beach.jpg",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 3,
    title: "City Explorer",
    description: "Urban adventures and cultural discoveries",
    icon: <Building size={32} />,
    image: "/new_york.jpg",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    title: "Culture Enthusiast",
    description: "Museums, history, and local traditions",
    icon: <Camera size={32} />,
    image: "/rome.jpg",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "Foodie Journey",
    description: "Culinary experiences around the world",
    icon: <Utensils size={32} />,
    image: "/tokyo.jpeg",
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 6,
    title: "Relaxation",
    description: "Peaceful retreats and wellness escapes",
    icon: <Sun size={32} />,
    image: "/bali.jpeg",
    color: "from-yellow-500 to-amber-600",
  },
];

const featuredExperiences = [
  {
    id: 1,
    title: "Hot Air Balloon Sunrise",
    location: "Cappadocia, Turkey",
    image: "/hotariballoons.jpg",
    price: "$199",
    rating: 4.9,
    reviews: 2847,
    duration: "4 hours",
    category: "Adventure",
  },
  {
    id: 2,
    title: "Ancient Pyramid Tour",
    location: "Giza, Egypt",
    image: "/egypt.jpg",
    price: "$89",
    rating: 4.8,
    reviews: 3521,
    duration: "6 hours",
    category: "History",
  },
  {
    id: 3,
    title: "Canal Cruise & Bike Tour",
    location: "Amsterdam, Netherlands",
    image: "/amsterdam.jpg",
    price: "$65",
    rating: 4.7,
    reviews: 1893,
    duration: "5 hours",
    category: "City Tour",
  },
  {
    id: 4,
    title: "Eiffel Tower Skip-the-Line",
    location: "Paris, France",
    image: "/eiffel_tower.jpeg",
    price: "$75",
    rating: 4.9,
    reviews: 5234,
    duration: "3 hours",
    category: "Landmark",
  },
  {
    id: 5,
    title: "Desert Safari & BBQ",
    location: "Dubai, UAE",
    image: "/dubai.jpg",
    price: "$129",
    rating: 4.8,
    reviews: 4102,
    duration: "8 hours",
    category: "Adventure",
  },
  {
    id: 6,
    title: "Big Ben & Westminster Walk",
    location: "London, UK",
    image: "/big_ben.jpg",
    price: "$45",
    rating: 4.6,
    reviews: 2156,
    duration: "3 hours",
    category: "Walking Tour",
  },
];

const quickDestinations = [
  { name: "Paris", image: "/paris.jpg", flights: "from $299" },
  { name: "Tokyo", image: "/tokyo.jpeg", flights: "from $599" },
  { name: "Bali", image: "/bali.jpeg", flights: "from $399" },
  { name: "Sydney", image: "/sydney.jpg", flights: "from $699" },
  { name: "Dubai", image: "/dubai.jpg", flights: "from $449" },
  { name: "Singapore", image: "/singapore.jpg", flights: "from $349" },
];

interface BookingExperience {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
  duration: string;
  category: string;
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialDestination = searchParams.get("destination") || "";

  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [prompt, setPrompt] = useState(
    initialDestination
      ? `I want to visit ${initialDestination} for 5 days with a budget of $2000`
      : "",
  );
  const [favorites, setFavorites] = useState<number[]>([]);
  const [bookingExperience, setBookingExperience] =
    useState<BookingExperience | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTravelers, setBookingTravelers] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Trip planning state
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(
    new Set([1, 2]),
  );

  useEffect(() => {
    if (initialDestination) {
      setPrompt(
        `I want to visit ${initialDestination} for 5 days with a budget of $2000`,
      );
    }
  }, [initialDestination]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setTripPlan(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch trip plan: ${response.statusText}`);
      }

      const data: TripPlan = await response.json();
      setTripPlan(data);

      // Scroll to results
      setTimeout(() => {
        document
          .getElementById("trip-results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to plan your trip. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (dayNumber: number) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dayNumber)) {
        newSet.delete(dayNumber);
      } else {
        newSet.add(dayNumber);
      }
      return newSet;
    });
  };

  const handleNewTrip = () => {
    setTripPlan(null);
    setPrompt("");
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookExperience = async () => {
    if (!bookingExperience || !bookingDate) return;

    setIsBooking(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, this would save to a database
    const existingBookings = JSON.parse(
      localStorage.getItem("jetsetgo-bookings") || "[]",
    );
    const newBooking = {
      id: `BK${Date.now()}`,
      type: "experience",
      title: bookingExperience.title,
      emoji: "🎫",
      date: bookingDate,
      time: "10:00 AM",
      status: "confirmed",
      price: bookingExperience.price,
      details: `${bookingTravelers} ${bookingTravelers === 1 ? "traveler" : "travelers"} • ${bookingExperience.duration}`,
      location: bookingExperience.location,
    };
    localStorage.setItem(
      "jetsetgo-bookings",
      JSON.stringify([...existingBookings, newBooking]),
    );

    setIsBooking(false);
    setBookingSuccess(true);
  };

  const closeBookingModal = () => {
    setBookingExperience(null);
    setBookingDate("");
    setBookingTravelers(1);
    setBookingSuccess(false);
  };

  const suggestions = [
    "Paris for 5 days with $2000",
    "Bali beach vacation for a week",
    "Tokyo anime and food tour",
    "Swiss Alps adventure trip",
  ];

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Section with Interactive Background */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Grid */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 grid-rows-2 h-full">
            {[
              "/hotariballoons.jpg",
              "/paris.jpg",
              "/tokyo.jpeg",
              "/bali.jpeg",
              "/dubai.jpg",
              "/egypt.jpg",
            ].map((img, index) => (
              <div key={index} className="relative overflow-hidden group">
                <Image
                  src={img}
                  alt="Destination"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={85}
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#222831]/60 group-hover:bg-[#222831]/40 transition-colors duration-500" />
              </div>
            ))}
          </div>
          {/* Central Overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#222831]/50 to-[#222831]/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20">
            <Sparkles size={18} className="text-[#00ADB5]" />
            <span className="text-white font-medium">
              AI-Powered Travel Planning
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Where Would You
            <span className="block bg-gradient-to-r from-[#00ADB5] to-cyan-400 bg-clip-text text-transparent">
              Like to Go?
            </span>
          </h1>

          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Describe your dream trip in your own words. Include destination,
            budget, number of days, and interests - our AI will craft the
            perfect itinerary for you.
          </p>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00ADB5] to-[#009ca3] rounded-xl flex items-center justify-center">
                  <Sparkles size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-white">
                    Plan Your Dream Trip
                  </h2>
                  <p className="text-sm text-white/70">
                    Tell us everything about your ideal vacation
                  </p>
                </div>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., I want to explore Tokyo for 7 days with a budget of $3000. I love anime, authentic ramen, ancient temples, and cherry blossoms..."
                className="w-full p-5 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-2xl focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/20 transition-all outline-none resize-none"
                rows={4}
                disabled={loading}
              />

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="flex-1 py-4 bg-gradient-to-r from-[#00ADB5] to-cyan-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#00ADB5]/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Planning Your Trip...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Plan My Trip
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>

              {/* Suggestions */}
              <div className="mt-5 flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-white/70 font-medium">Try:</span>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setPrompt(`I want to visit ${suggestion}`)}
                    className="text-sm px-4 py-1.5 bg-white/10 text-white/90 rounded-full hover:bg-[#00ADB5] transition-all duration-300 hover:scale-105 border border-white/20"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 relative z-20">
            {[
              { label: "Destinations", value: "500+" },
              { label: "Happy Travelers", value: "2M+" },
              { label: "5-Star Reviews", value: "50K+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        {!tripPlan && !loading && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={() => setError(null)}
              className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center">
          <div className="max-w-md mx-auto px-4">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-[#00ADB5]/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-[#00ADB5] rounded-full animate-spin" />
              <Plane
                size={32}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00ADB5]"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#222831] mb-2">
              Planning Your Perfect Trip
            </h3>
            <p className="text-[#393E46]">
              Our AI is searching for the best flights, hotels, and creating
              your personalized itinerary...
            </p>
          </div>
        </div>
      )}

      {/* Trip Results */}
      {tripPlan && !loading && !error && (
        <div
          id="trip-results"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in"
        >
          {/* Budget Overview */}
          <BudgetOverview budget={tripPlan.budget} />

          {/* Flights */}
          {tripPlan.flights && tripPlan.flights.length > 0 && (
            <section
              className="animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="text-2xl font-bold text-[#222831] mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-xl flex items-center justify-center">
                  <Plane size={24} className="text-[#00ADB5]" />
                </div>
                Available Flights
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tripPlan.flights.map((flight, index) => (
                  <FlightCard
                    key={`flight-${flight.from}-${flight.to}-${index}`}
                    flight={flight}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Hotels */}
          {tripPlan.hotels && tripPlan.hotels.length > 0 && (
            <section
              className="animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-2xl font-bold text-[#222831] mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-xl flex items-center justify-center">
                  <Hotel size={24} className="text-[#00ADB5]" />
                </div>
                Recommended Hotels
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tripPlan.hotels.map((hotel, index) => (
                  <HotelCard
                    key={`hotel-${hotel.name}-${index}`}
                    hotel={hotel}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Itinerary */}
          {tripPlan.itinerary && tripPlan.itinerary.length > 0 && (
            <section
              className="animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h2 className="text-2xl font-bold text-[#222831] mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-xl flex items-center justify-center">
                  <Calendar size={24} className="text-[#00ADB5]" />
                </div>
                Your Itinerary
              </h2>
              <div className="space-y-4">
                {tripPlan.itinerary.map((day, index) => {
                  const dayNum = day.day_number ?? index + 1;
                  return (
                    <DayCard
                      key={`day-${dayNum}-${index}`}
                      day={{ ...day, day_number: dayNum }}
                      isExpanded={expandedDays.has(dayNum)}
                      onToggle={() => toggleDay(dayNum)}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {/* Plan Another Trip */}
          <div className="text-center pt-8">
            <button
              onClick={handleNewTrip}
              className="px-8 py-3 bg-[#222831] text-white rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-[#393E46] transition-colors"
            >
              <Sparkles size={18} />
              Plan Another Trip
            </button>
          </div>
        </div>
      )}

      {/* Only show browse sections when not showing results */}
      {!tripPlan && !loading && (
        <>
          {/* Travel Style Section */}
          <section className="py-24 bg-[#EEEEEE] relative z-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#00ADB5]/10 text-[#00ADB5] rounded-full text-sm font-semibold mb-4">
                  Personalized for You
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#222831] mb-4">
                  What&apos;s Your Travel Style?
                </h2>
                <p className="text-lg text-[#393E46] max-w-2xl mx-auto">
                  Select your preferred travel style and we&apos;ll curate
                  destinations that match your vibe
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setSelectedStyle(
                        selectedStyle === style.id ? null : style.id,
                      );
                      setPrompt(
                        `I want a ${style.title.toLowerCase()} trip - ${style.description.toLowerCase()}`,
                      );
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`relative h-64 rounded-3xl overflow-hidden group transition-all duration-500 ${
                      selectedStyle === style.id
                        ? "ring-4 ring-[#00ADB5] ring-offset-4 scale-[1.02]"
                        : "hover:scale-[1.02]"
                    }`}
                  >
                    <Image
                      src={style.image}
                      alt={style.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${style.color} opacity-80 group-hover:opacity-70 transition-opacity`}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {style.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{style.title}</h3>
                      <p className="text-white/80 text-center">
                        {style.description}
                      </p>
                    </div>
                    {selectedStyle === style.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#00ADB5]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Destinations */}
          <section className="py-20 bg-[#222831] relative z-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    Popular Destinations
                  </h2>
                  <p className="text-[#EEEEEE]/70">
                    Trending places our travelers love
                  </p>
                </div>
                <Link
                  href="/destinations"
                  className="hidden md:flex items-center gap-2 text-[#00ADB5] hover:text-[#00ADB5]/80 font-semibold transition-colors"
                >
                  View All
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickDestinations.map((dest, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPrompt(
                        `I want to visit ${dest.name} for 5 days with a budget of $2000`,
                      );
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative h-48 rounded-2xl overflow-hidden text-left"
                  >
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg">
                        {dest.name}
                      </h3>
                      <p className="text-[#00ADB5] text-sm font-medium">
                        {dest.flights}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Experiences */}
          <section className="py-24 bg-[#EEEEEE] relative z-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#00ADB5]/10 text-[#00ADB5] rounded-full text-sm font-semibold mb-4">
                  <TrendingUp size={14} className="inline mr-2" />
                  Trending Now
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#222831] mb-4">
                  Unforgettable Experiences
                </h2>
                <p className="text-lg text-[#393E46] max-w-2xl mx-auto">
                  Book incredible tours and activities handpicked by travel
                  experts
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-56">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#222831] text-sm font-medium rounded-full">
                          {exp.category}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleFavorite(exp.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart
                          size={20}
                          className={
                            favorites.includes(exp.id)
                              ? "fill-red-500 text-red-500"
                              : "text-[#393E46]"
                          }
                        />
                      </button>
                      <div className="absolute bottom-4 right-4 px-4 py-2 bg-[#222831]/90 backdrop-blur-sm rounded-xl">
                        <span className="text-white font-bold text-lg">
                          {exp.price}
                        </span>
                        <span className="text-white/70 text-sm"> /person</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-[#393E46] mb-2">
                        <MapPin size={14} className="text-[#00ADB5]" />
                        {exp.location}
                      </div>
                      <h3 className="text-xl font-bold text-[#222831] mb-3 group-hover:text-[#00ADB5] transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
                            />
                            <span className="font-semibold text-[#222831]">
                              {exp.rating}
                            </span>
                          </div>
                          <span className="text-[#393E46]">
                            ({exp.reviews.toLocaleString()} reviews)
                          </span>
                        </div>
                        <span className="text-sm text-[#393E46]">
                          {exp.duration}
                        </span>
                      </div>
                      <button
                        onClick={() => setBookingExperience(exp)}
                        className="w-full py-3 bg-[#00ADB5] text-white rounded-xl font-medium hover:bg-[#00ADB5]/90 transition-all"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#222831] text-white rounded-xl font-semibold hover:bg-[#393E46] transition-colors"
                >
                  Explore All Experiences
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/sky_gliding.jpg"
                alt="Adventure awaits"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#222831]/80 to-[#00ADB5]/60" />
            </div>
            <div className="relative max-w-4xl mx-auto text-center px-4">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Let our AI plan your perfect trip. Just tell us your dream
                destination and we&apos;ll handle the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-8 py-4 bg-white text-[#222831] rounded-xl font-semibold text-lg hover:bg-[#EEEEEE] transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} className="text-[#00ADB5]" />
                  Start Planning
                </button>
                <Link
                  href="/destinations"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  Browse Destinations
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Booking Modal */}
      {bookingExperience && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden animate-fade-in">
            {!bookingSuccess ? (
              <>
                {/* Experience Image */}
                <div className="relative h-48">
                  <Image
                    src={bookingExperience.image}
                    alt={bookingExperience.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">
                      {bookingExperience.title}
                    </h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <MapPin size={14} />
                      {bookingExperience.location}
                    </p>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#EEEEEE] rounded-xl">
                    <span className="text-[#393E46]">Price per person</span>
                    <span className="text-xl font-bold text-[#00ADB5]">
                      {bookingExperience.price}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#393E46] mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#393E46] mb-2">
                      Number of Travelers
                    </label>
                    <select
                      value={bookingTravelers}
                      onChange={(e) =>
                        setBookingTravelers(parseInt(e.target.value))
                      }
                      className="w-full px-4 py-3 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Traveler" : "Travelers"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 bg-[#222831] rounded-xl text-white">
                    <div className="flex justify-between mb-2">
                      <span>
                        {bookingExperience.price} × {bookingTravelers}
                      </span>
                      <span>
                        $
                        {parseInt(
                          bookingExperience.price.replace(/[^0-9]/g, ""),
                        ) * bookingTravelers}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-white/20 pt-2">
                      <span>Total</span>
                      <span className="text-[#00ADB5]">
                        $
                        {parseInt(
                          bookingExperience.price.replace(/[^0-9]/g, ""),
                        ) * bookingTravelers}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={closeBookingModal}
                      className="flex-1 px-6 py-3 rounded-xl text-[#393E46] hover:bg-[#EEEEEE] transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBookExperience}
                      disabled={!bookingDate || isBooking}
                      className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                        bookingDate && !isBooking
                          ? "bg-[#00ADB5] text-white hover:bg-[#00ADB5]/90"
                          : "bg-[#EEEEEE] text-[#393E46] cursor-not-allowed"
                      }`}
                    >
                      {isBooking ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Booking...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#222831] mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-[#393E46] mb-6">
                  Your {bookingExperience.title} experience has been booked for{" "}
                  {bookingDate}.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closeBookingModal}
                    className="flex-1 px-6 py-3 rounded-xl text-[#393E46] hover:bg-[#EEEEEE] transition-all"
                  >
                    Close
                  </button>
                  <Link
                    href="/bookings"
                    className="flex-1 px-6 py-3 rounded-xl bg-[#00ADB5] text-white font-medium hover:bg-[#00ADB5]/90 transition-all text-center"
                  >
                    View Bookings
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#00ADB5] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
