"use client";

import { ChevronDown, ChevronUp, Clock, MapPin } from "lucide-react";
import { DayItinerary } from "@/types";

interface DayCardProps {
  day: DayItinerary;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function DayCard({ day, isExpanded, onToggle }: DayCardProps) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-[#EEEEEE]/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-r from-[#00ADB5] to-[#009ca3] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {day.day_number}
            </span>
          </div>
          <div className="text-left">
            <p className="font-semibold text-[#222831]">Day {day.day_number}</p>
            <p className="text-sm text-[#393E46]">
              {day.date} • {day.activities?.length || 0} activities
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className="text-[#393E46]" />
        ) : (
          <ChevronDown size={20} className="text-[#393E46]" />
        )}
      </button>
      {isExpanded && day.activities && (
        <div className="px-6 pb-6 border-t border-[#EEEEEE]">
          <div className="pt-6 space-y-4">
            {day.activities.map((activity, i) => (
              <div
                key={`activity-${day.day_number}-${i}`}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#00ADB5]/10 rounded-lg flex items-center justify-center">
                    <Clock size={16} className="text-[#00ADB5]" />
                  </div>
                  {i < day.activities.length - 1 && (
                    <div className="w-px flex-1 bg-[#00ADB5]/20 my-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm text-[#00ADB5] font-medium">
                    {activity.time}
                  </p>
                  <p className="font-semibold text-[#222831] mt-1">
                    {activity.activity_name}
                  </p>
                  <p className="text-sm text-[#393E46] flex items-center gap-1 mt-1">
                    <MapPin size={12} />
                    {activity.location}
                  </p>
                  {activity.description && (
                    <p className="text-sm text-[#393E46]/70 mt-2">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {day.notes && (
            <div className="mt-4 p-4 bg-[#00ADB5]/10 border border-[#00ADB5]/20 rounded-xl">
              <p className="text-sm text-[#222831]">💡 {day.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
