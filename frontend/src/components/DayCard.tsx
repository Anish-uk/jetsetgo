import { DayItinerary } from "@/types";

interface DayCardProps {
  day: DayItinerary;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function DayCard({
  day,
  isExpanded = true,
  onToggle,
}: DayCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Day {day.day_number}</h3>
            <p className="text-sm text-purple-100">{day.date}</p>
          </div>
          {onToggle && (
            <button className="text-white hover:text-purple-200 transition-colors">
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-6">
          <div className="space-y-4">
            {day.activities.map((activity, index) => (
              <div
                key={index}
                className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex-shrink-0 w-16">
                  <div className="bg-blue-100 text-blue-600 rounded-lg px-2 py-1 text-sm font-semibold text-center">
                    {activity.time}
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {activity.activity_name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    📍 {activity.location}
                  </p>
                  {activity.description && (
                    <p className="text-sm text-gray-500 italic">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {day.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200 bg-yellow-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">💡 Note:</span> {day.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
