"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Hotel,
  Search,
  Calendar,
  Users,
  MapPin,
  Star,
  Heart,
  Wifi,
  Car,
  Coffee,
  Waves,
  Dumbbell,
  UtensilsCrossed,
  Filter,
  Sparkles,
} from "lucide-react";

const mockHotels = [
  {
    id: 1,
    name: "The Grand Palace Hotel",
    location: "Paris, France",
    image: "/grand_palace.jpeg",
    rating: 4.8,
    reviews: 2847,
    price: 12500,
    originalPrice: 15000,
    amenities: ["wifi", "pool", "gym", "restaurant", "parking"],
    description:
      "Luxurious 5-star hotel with stunning Eiffel Tower views and world-class amenities.",
    distance: "0.5 km from city center",
  },
  {
    id: 2,
    name: "Sakura Garden Inn",
    location: "Tokyo, Japan",
    image: "/sakura_inn.jpg",
    rating: 4.9,
    reviews: 1923,
    price: 9800,
    originalPrice: 11500,
    amenities: ["wifi", "restaurant", "spa"],
    description:
      "Traditional Japanese ryokan with modern comforts and serene garden views.",
    distance: "1.2 km from Shibuya Station",
  },
  {
    id: 3,
    name: "Beachfront Paradise Resort",
    location: "Bali, Indonesia",
    image: "/beachfront.jpg",
    rating: 4.7,
    reviews: 3156,
    price: 8200,
    originalPrice: 9500,
    amenities: ["wifi", "pool", "spa", "restaurant", "beach"],
    description:
      "Stunning beachfront resort with private villas and infinity pool.",
    distance: "Beachfront",
  },
  {
    id: 4,
    name: "Manhattan Luxury Suites",
    location: "New York, USA",
    image: "/manhattan.jpeg",
    rating: 4.6,
    reviews: 4521,
    price: 18500,
    originalPrice: 22000,
    amenities: ["wifi", "gym", "restaurant", "parking", "concierge"],
    description:
      "Modern luxury suites in the heart of Manhattan with skyline views.",
    distance: "0.3 km from Times Square",
  },
  {
    id: 5,
    name: "Swiss Alpine Lodge",
    location: "Zurich, Switzerland",
    image: "/alps.jpg",
    rating: 4.9,
    reviews: 1287,
    price: 14200,
    originalPrice: 16500,
    amenities: ["wifi", "spa", "restaurant", "ski"],
    description:
      "Cozy mountain lodge with breathtaking Alpine views and ski-in/ski-out access.",
    distance: "Near ski lifts",
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi size={14} />,
  pool: <Waves size={14} />,
  gym: <Dumbbell size={14} />,
  restaurant: <UtensilsCrossed size={14} />,
  parking: <Car size={14} />,
  spa: <Coffee size={14} />,
};

export default function HotelsPage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [priceRange] = useState([0, 25000]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner with Background Image */}
      <div className="relative py-32 pt-48 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/beachfront.jpg"
            alt="Hotels background"
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
              <Hotel size={24} className="text-[#00ADB5]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Find Your Perfect Stay
              </h1>
              <p className="text-[#EEEEEE]/70">
                Discover amazing hotels, resorts, and unique accommodations
                worldwide
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: <Sparkles size={18} />, text: "Best Price Guarantee" },
              { icon: <Star size={18} />, text: "50K+ Hotels" },
              { icon: <Heart size={18} />, text: "Free Cancellation" },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-[#222831] mb-2">
                Destination
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#393E46]"
                />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="City, hotel, or landmark"
                  className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE] border-2 border-transparent rounded-xl text-[#222831] placeholder-[#393E46]/50 focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222831] mb-2">
                Check-in
              </label>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#393E46]"
                />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE] border-2 border-transparent rounded-xl text-[#222831] focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222831] mb-2">
                Check-out
              </label>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#393E46]"
                />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE] border-2 border-transparent rounded-xl text-[#222831] focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222831] mb-2">
                Guests & Rooms
              </label>
              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#393E46]"
                />
                <select
                  value={`${guests}-${rooms}`}
                  onChange={(e) => {
                    const [g, r] = e.target.value.split("-");
                    setGuests(Number(g));
                    setRooms(Number(r));
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE] border-2 border-transparent rounded-xl text-[#222831] focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/10 outline-none appearance-none transition-all"
                >
                  <option value="1-1">1 Guest, 1 Room</option>
                  <option value="2-1">2 Guests, 1 Room</option>
                  <option value="3-2">3 Guests, 2 Rooms</option>
                  <option value="4-2">4 Guests, 2 Rooms</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#222831] font-medium">
                Price Range:
              </span>
              <span className="text-sm text-[#00ADB5] font-semibold">
                ₹{priceRange[0].toLocaleString()} - ₹
                {priceRange[1].toLocaleString()}
              </span>
            </div>
            <button className="btn-primary px-10 py-3.5 rounded-xl font-semibold flex items-center gap-2 w-full sm:w-auto justify-center">
              <Search size={18} />
              Search Hotels
            </button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-[#222831]">
            <Filter size={18} />
            <span className="font-medium">Filters:</span>
          </div>
          {[
            "Free Cancellation",
            "Breakfast Included",
            "Pool",
            "Pet Friendly",
            "5 Star",
          ].map((filter, i) => (
            <button
              key={filter}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                i === 0
                  ? "bg-[#00ADB5] text-white shadow-lg shadow-[#00ADB5]/30"
                  : "bg-white border-2 border-[#EEEEEE] text-[#222831] hover:border-[#00ADB5]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Hotel Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockHotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="card rounded-xl overflow-hidden card-hover opacity-0 animate-slide-up group"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <button
                  onClick={() => toggleFavorite(hotel.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all ${
                    favorites.includes(hotel.id)
                      ? "bg-[#00ADB5] text-white"
                      : "bg-white/90 text-[#393E46] hover:bg-[#00ADB5] hover:text-white"
                  }`}
                >
                  <Heart
                    size={18}
                    className={
                      favorites.includes(hotel.id) ? "fill-current" : ""
                    }
                  />
                </button>
                {hotel.originalPrice > hotel.price && (
                  <div className="absolute top-4 left-4 bg-[#00ADB5] text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {Math.round(
                      ((hotel.originalPrice - hotel.price) /
                        hotel.originalPrice) *
                        100,
                    )}
                    % OFF
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#222831] mb-1">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-[#393E46] flex items-center gap-1">
                      <MapPin size={14} className="text-[#00ADB5]" />
                      {hotel.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#00ADB5]/10 px-3 py-1 rounded-lg">
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="font-semibold text-[#222831]">
                      {hotel.rating}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#393E46] mb-3 line-clamp-2">
                  {hotel.description}
                </p>
                <p className="text-xs text-[#00ADB5] mb-4">{hotel.distance}</p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-1 px-2.5 py-1 bg-[#EEEEEE] rounded-lg text-[#393E46] text-xs"
                    >
                      {amenityIcons[amenity]}
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Book */}
                <div className="flex items-center justify-between pt-4 border-t border-[#EEEEEE]">
                  <div>
                    {hotel.originalPrice > hotel.price && (
                      <p className="text-sm text-[#393E46] line-through">
                        ₹{hotel.originalPrice.toLocaleString()}
                      </p>
                    )}
                    <p className="text-2xl font-bold text-[#222831]">
                      ₹{hotel.price.toLocaleString()}
                      <span className="text-sm font-normal text-[#393E46]">
                        {" "}
                        / night
                      </span>
                    </p>
                  </div>
                  <button className="btn-primary px-6 py-2.5 rounded-xl font-medium">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
