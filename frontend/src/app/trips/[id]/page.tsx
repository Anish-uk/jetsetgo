"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Plane,
  Hotel,
  DollarSign,
  ArrowLeft,
  Edit,
  Trash2,
  Share2,
  Heart,
  CheckCircle,
  Circle,
  Plus,
  Sparkles,
  Camera,
  Utensils,
  Ticket,
} from "lucide-react";

// Mock trip data - in a real app, this would come from an API
const mockTrips = [
  {
    id: "1",
    destination: "Paris, France",
    emoji: "🗼",
    image: "/paris.jpg",
    dates: "Mar 15 - Mar 22, 2025",
    status: "upcoming",
    budget: 2500,
    spent: 1850,
    flights: [
      {
        id: 1,
        from: "New York (JFK)",
        to: "Paris (CDG)",
        date: "Mar 15, 2025",
        time: "7:30 PM",
        airline: "Air France",
        flightNo: "AF123",
        price: 650,
        status: "confirmed",
      },
      {
        id: 2,
        from: "Paris (CDG)",
        to: "New York (JFK)",
        date: "Mar 22, 2025",
        time: "10:00 AM",
        airline: "Air France",
        flightNo: "AF456",
        price: 620,
        status: "confirmed",
      },
    ],
    hotels: [
      {
        id: 1,
        name: "Hotel Le Marais",
        address: "15 Rue du Temple, Paris",
        checkIn: "Mar 15, 2025",
        checkOut: "Mar 22, 2025",
        nights: 7,
        pricePerNight: 180,
        totalPrice: 1260,
        status: "confirmed",
        image: "/paris.jpg",
      },
    ],
    activities: [
      {
        id: 1,
        name: "Eiffel Tower Visit",
        date: "Mar 16",
        time: "10:00 AM",
        price: 30,
        completed: false,
      },
      {
        id: 2,
        name: "Louvre Museum",
        date: "Mar 16",
        time: "2:00 PM",
        price: 25,
        completed: false,
      },
      {
        id: 3,
        name: "Seine River Cruise",
        date: "Mar 17",
        time: "6:00 PM",
        price: 45,
        completed: false,
      },
      {
        id: 4,
        name: "Montmartre Walking Tour",
        date: "Mar 18",
        time: "9:00 AM",
        price: 35,
        completed: false,
      },
      {
        id: 5,
        name: "Cooking Class",
        date: "Mar 19",
        time: "11:00 AM",
        price: 120,
        completed: false,
      },
      {
        id: 6,
        name: "Versailles Day Trip",
        date: "Mar 20",
        time: "8:00 AM",
        price: 85,
        completed: false,
      },
      {
        id: 7,
        name: "Notre Dame Area Walk",
        date: "Mar 21",
        time: "10:00 AM",
        price: 0,
        completed: false,
      },
      {
        id: 8,
        name: "Farewell Dinner at Le Jules Verne",
        date: "Mar 21",
        time: "7:00 PM",
        price: 200,
        completed: false,
      },
    ],
  },
  {
    id: "2",
    destination: "Tokyo, Japan",
    emoji: "🗾",
    image: "/tokyo.jpeg",
    dates: "Apr 5 - Apr 15, 2025",
    status: "planning",
    budget: 4000,
    spent: 0,
    flights: [],
    hotels: [],
    activities: [],
  },
  {
    id: "3",
    destination: "Bali, Indonesia",
    emoji: "🏝️",
    image: "/bali.jpeg",
    dates: "Dec 20 - Dec 30, 2024",
    status: "completed",
    budget: 3000,
    spent: 2750,
    flights: [
      {
        id: 1,
        from: "Singapore (SIN)",
        to: "Bali (DPS)",
        date: "Dec 20, 2024",
        time: "9:00 AM",
        airline: "Singapore Airlines",
        flightNo: "SQ456",
        price: 280,
        status: "completed",
      },
      {
        id: 2,
        from: "Bali (DPS)",
        to: "Singapore (SIN)",
        date: "Dec 30, 2024",
        time: "4:00 PM",
        airline: "Singapore Airlines",
        flightNo: "SQ457",
        price: 280,
        status: "completed",
      },
    ],
    hotels: [
      {
        id: 1,
        name: "Ubud Jungle Resort",
        address: "Jl. Raya Ubud, Bali",
        checkIn: "Dec 20, 2024",
        checkOut: "Dec 25, 2024",
        nights: 5,
        pricePerNight: 150,
        totalPrice: 750,
        status: "completed",
        image: "/bali.jpeg",
      },
      {
        id: 2,
        name: "Seminyak Beach Hotel",
        address: "Jl. Kayu Aya, Seminyak",
        checkIn: "Dec 25, 2024",
        checkOut: "Dec 30, 2024",
        nights: 5,
        pricePerNight: 180,
        totalPrice: 900,
        status: "completed",
        image: "/beach.jpg",
      },
    ],
    activities: [
      {
        id: 1,
        name: "Tegallalang Rice Terraces",
        date: "Dec 21",
        time: "8:00 AM",
        price: 20,
        completed: true,
      },
      {
        id: 2,
        name: "Ubud Monkey Forest",
        date: "Dec 21",
        time: "2:00 PM",
        price: 15,
        completed: true,
      },
      {
        id: 3,
        name: "Mount Batur Sunrise Trek",
        date: "Dec 22",
        time: "4:00 AM",
        price: 65,
        completed: true,
      },
      {
        id: 4,
        name: "Balinese Cooking Class",
        date: "Dec 23",
        time: "10:00 AM",
        price: 45,
        completed: true,
      },
      {
        id: 5,
        name: "Uluwatu Temple Sunset",
        date: "Dec 26",
        time: "4:00 PM",
        price: 25,
        completed: true,
      },
      {
        id: 6,
        name: "Snorkeling Trip",
        date: "Dec 27",
        time: "9:00 AM",
        price: 55,
        completed: true,
      },
      {
        id: 7,
        name: "Spa Day",
        date: "Dec 28",
        time: "2:00 PM",
        price: 80,
        completed: true,
      },
      {
        id: 8,
        name: "Beach Club Day",
        date: "Dec 29",
        time: "11:00 AM",
        price: 50,
        completed: true,
      },
    ],
  },
];

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState<(typeof mockTrips)[0] | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const foundTrip = mockTrips.find((t) => t.id === params.id);
    setTrip(foundTrip || null);
  }, [params.id]);

  const handleDelete = () => {
    // In a real app, this would call an API
    router.push("/trips");
  };

  const toggleActivity = (activityId: number) => {
    if (!trip) return;
    setTrip({
      ...trip,
      activities: trip.activities.map((a) =>
        a.id === activityId ? { ...a, completed: !a.completed } : a,
      ),
    });
  };

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles size={48} className="text-[#00ADB5] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#222831]">Trip not found</h2>
          <Link
            href="/trips"
            className="text-[#00ADB5] hover:underline mt-2 inline-block"
          >
            Back to My Trips
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-[#00ADB5]/10 text-[#00ADB5]";
      case "planning":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const budgetPercentage = (trip.spent / trip.budget) * 100;

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner */}
      <div className="relative py-32 pt-48 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={trip.image}
            alt={trip.destination}
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to My Trips
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize mb-4 ${getStatusColor(trip.status)}`}
              >
                {trip.status}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {trip.emoji} {trip.destination}
              </h1>
              <p className="text-xl text-[#EEEEEE]/90 flex items-center gap-2">
                <Calendar size={20} />
                {trip.dates}
              </p>
            </div>

            <div className="flex gap-3">
              <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all">
                <Share2 size={20} />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all">
                <Heart size={20} />
              </button>
              <Link
                href={`/trips/${trip.id}/edit`}
                className="p-3 bg-[#00ADB5] text-white rounded-xl hover:bg-[#00ADB5]/90 transition-all"
              >
                <Edit size={20} />
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Overview Card */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-[#393E46] mb-1">Trip Budget</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#222831]">
                  ${trip.spent.toLocaleString()}
                </span>
                <span className="text-[#393E46]">
                  / ${trip.budget.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="h-3 bg-[#EEEEEE] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    budgetPercentage > 90
                      ? "bg-red-500"
                      : budgetPercentage > 70
                        ? "bg-yellow-500"
                        : "bg-[#00ADB5]"
                  }`}
                  style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                />
              </div>
              <p className="text-sm text-[#393E46] mt-1 text-right">
                {budgetPercentage.toFixed(0)}% used
              </p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-[#00ADB5]">
                  {trip.flights.length}
                </p>
                <p className="text-sm text-[#393E46]">Flights</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#00ADB5]">
                  {trip.hotels.length}
                </p>
                <p className="text-sm text-[#393E46]">Hotels</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#00ADB5]">
                  {trip.activities.length}
                </p>
                <p className="text-sm text-[#393E46]">Activities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["overview", "flights", "hotels", "activities"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-[#00ADB5] text-white"
                  : "bg-white text-[#393E46] hover:bg-[#00ADB5]/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            {[
              {
                icon: Plane,
                label: "Flights Booked",
                value: trip.flights.length,
                color: "text-blue-500",
              },
              {
                icon: Hotel,
                label: "Nights Stay",
                value: trip.hotels.reduce((acc, h) => acc + h.nights, 0),
                color: "text-purple-500",
              },
              {
                icon: Ticket,
                label: "Activities",
                value: trip.activities.length,
                color: "text-orange-500",
              },
              {
                icon: Camera,
                label: "Completed",
                value: trip.activities.filter((a) => a.completed).length,
                color: "text-green-500",
              },
              {
                icon: DollarSign,
                label: "Remaining",
                value: `$${(trip.budget - trip.spent).toLocaleString()}`,
                color: "text-[#00ADB5]",
              },
              {
                icon: Utensils,
                label: "Dining Plans",
                value: trip.activities.filter(
                  (a) =>
                    a.name.toLowerCase().includes("dinner") ||
                    a.name.toLowerCase().includes("cooking"),
                ).length,
                color: "text-red-500",
              },
            ].map((stat, i) => (
              <div key={i} className="card p-6 flex items-center gap-4">
                <div className={`p-3 bg-[#EEEEEE] rounded-xl ${stat.color}`}>
                  <stat.icon size={24} />
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
        )}

        {/* Flights Tab */}
        {activeTab === "flights" && (
          <div className="space-y-4">
            {trip.flights.length === 0 ? (
              <div className="card p-12 text-center">
                <Plane size={48} className="text-[#00ADB5] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#222831] mb-2">
                  No flights booked yet
                </h3>
                <p className="text-[#393E46] mb-6">Add flights to your trip</p>
                <Link
                  href="/flights"
                  className="btn-primary px-6 py-3 rounded-xl inline-flex items-center gap-2"
                >
                  <Plus size={20} />
                  Search Flights
                </Link>
              </div>
            ) : (
              trip.flights.map((flight) => (
                <div key={flight.id} className="card p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(flight.status)}`}
                        >
                          {flight.status}
                        </span>
                        <span className="text-sm text-[#393E46]">
                          {flight.airline} • {flight.flightNo}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-bold text-[#222831]">
                            {flight.from}
                          </p>
                          <p className="text-sm text-[#393E46]">
                            {flight.time}
                          </p>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="h-px flex-1 bg-[#EEEEEE]" />
                          <Plane size={20} className="text-[#00ADB5]" />
                          <div className="h-px flex-1 bg-[#EEEEEE]" />
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#222831]">
                            {flight.to}
                          </p>
                          <p className="text-sm text-[#393E46]">
                            {flight.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#00ADB5]">
                        ${flight.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Hotels Tab */}
        {activeTab === "hotels" && (
          <div className="space-y-4">
            {trip.hotels.length === 0 ? (
              <div className="card p-12 text-center">
                <Hotel size={48} className="text-[#00ADB5] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#222831] mb-2">
                  No hotels booked yet
                </h3>
                <p className="text-[#393E46] mb-6">
                  Find the perfect place to stay
                </p>
                <Link
                  href="/hotels"
                  className="btn-primary px-6 py-3 rounded-xl inline-flex items-center gap-2"
                >
                  <Plus size={20} />
                  Search Hotels
                </Link>
              </div>
            ) : (
              trip.hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="card p-6 flex flex-col md:flex-row gap-6"
                >
                  <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden relative shrink-0">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize mb-2 ${getStatusColor(hotel.status)}`}
                    >
                      {hotel.status}
                    </span>
                    <h3 className="text-xl font-bold text-[#222831] mb-1">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-[#393E46] flex items-center gap-1 mb-4">
                      <MapPin size={14} />
                      {hotel.address}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1 text-[#393E46]">
                        <Calendar size={14} className="text-[#00ADB5]" />
                        {hotel.checkIn} - {hotel.checkOut}
                      </span>
                      <span className="flex items-center gap-1 text-[#393E46]">
                        <Clock size={14} className="text-[#00ADB5]" />
                        {hotel.nights} nights
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#00ADB5]">
                      ${hotel.totalPrice}
                    </p>
                    <p className="text-sm text-[#393E46]">
                      ${hotel.pricePerNight}/night
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === "activities" && (
          <div className="space-y-3">
            {trip.activities.length === 0 ? (
              <div className="card p-12 text-center">
                <Ticket size={48} className="text-[#00ADB5] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#222831] mb-2">
                  No activities planned yet
                </h3>
                <p className="text-[#393E46] mb-6">
                  Discover experiences for your trip
                </p>
                <Link
                  href="/explore"
                  className="btn-primary px-6 py-3 rounded-xl inline-flex items-center gap-2"
                >
                  <Plus size={20} />
                  Explore Activities
                </Link>
              </div>
            ) : (
              trip.activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`card p-4 flex items-center gap-4 cursor-pointer transition-all ${
                    activity.completed ? "opacity-60" : ""
                  }`}
                  onClick={() => toggleActivity(activity.id)}
                >
                  <button className="shrink-0">
                    {activity.completed ? (
                      <CheckCircle size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} className="text-[#393E46]" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${activity.completed ? "line-through text-[#393E46]" : "text-[#222831]"}`}
                    >
                      {activity.name}
                    </p>
                    <p className="text-sm text-[#393E46]">
                      {activity.date} • {activity.time}
                    </p>
                  </div>
                  <p className="text-[#00ADB5] font-bold">
                    {activity.price > 0 ? `$${activity.price}` : "Free"}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-xl font-bold text-[#222831] mb-2">
              Delete Trip?
            </h3>
            <p className="text-[#393E46] mb-6">
              Are you sure you want to delete your trip to {trip.destination}?
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 rounded-xl text-[#393E46] hover:bg-[#EEEEEE] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
