"use client";

import { Plane } from "lucide-react";
import { Flight } from "@/types";

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <div className="card rounded-xl p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-xl flex items-center justify-center">
            <Plane size={24} className="text-[#00ADB5]" />
          </div>
          <div>
            <p className="font-semibold text-[#222831]">
              {flight.airline || "Airline"}
            </p>
            <p className="text-sm text-[#393E46]">
              {flight.duration || "Direct"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#222831]">
            ₹{Math.round(flight.price).toLocaleString()}
          </p>
          <p className="text-xs text-[#393E46]">per person</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-lg font-bold text-[#222831]">{flight.from}</p>
          <p className="text-sm text-[#393E46]">
            {flight.departure?.split("T")[1]?.slice(0, 5) || "10:00"}
          </p>
        </div>
        <div className="flex-1 px-4">
          <div className="relative flex items-center justify-center">
            <div className="h-px flex-1 bg-[#00ADB5]/30" />
            <Plane size={16} className="mx-2 text-[#00ADB5] rotate-90" />
            <div className="h-px flex-1 bg-[#00ADB5]/30" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[#222831]">{flight.to}</p>
          <p className="text-sm text-[#393E46]">
            {flight.arrival?.split("T")[1]?.slice(0, 5) || "18:00"}
          </p>
        </div>
      </div>
      <button className="w-full mt-4 py-3 border-2 border-[#00ADB5] text-[#00ADB5] rounded-xl hover:bg-[#00ADB5] hover:text-white transition-all font-medium">
        Select Flight
      </button>
    </div>
  );
}
