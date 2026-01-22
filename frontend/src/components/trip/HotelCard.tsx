"use client";

import { Hotel, MapPin, Star } from "lucide-react";
import { Hotel as HotelType } from "@/types";

interface HotelCardProps {
  hotel: HotelType;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="card rounded-xl p-6 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-xl flex items-center justify-center">
            <Hotel size={24} className="text-[#00ADB5]" />
          </div>
          <div>
            <p className="font-semibold text-[#222831]">{hotel.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={12} className="text-[#393E46]" />
              <p className="text-sm text-[#393E46]">{hotel.location}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#222831]">
            ₹{Math.round(hotel.price).toLocaleString()}
          </p>
          <p className="text-xs text-[#393E46]">per night</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[#222831] font-medium">
            {hotel.rating?.toFixed(1) || "4.5"}
          </span>
        </div>
        {hotel.distance && (
          <span className="text-sm text-[#393E46]">{hotel.distance}</span>
        )}
      </div>
      {hotel.amenities && hotel.amenities.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, i) => (
            <span
              key={`${amenity}-${i}`}
              className="text-xs px-3 py-1 bg-[#EEEEEE] text-[#393E46] rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>
      )}
      <button className="w-full py-3 border-2 border-[#00ADB5] text-[#00ADB5] rounded-xl hover:bg-[#00ADB5] hover:text-white transition-all font-medium">
        View Details
      </button>
    </div>
  );
}
