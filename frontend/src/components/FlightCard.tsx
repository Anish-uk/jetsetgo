import { Flight } from "@/types";

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">✈️ Flight</h3>
        <span className="text-2xl font-bold text-blue-600">
          ${flight.price}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-500">From</p>
            <p className="text-lg font-semibold text-gray-900">{flight.from}</p>
            <p className="text-sm text-gray-600">{flight.departure}</p>
          </div>

          <div className="px-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          <div className="flex-1 text-right">
            <p className="text-sm text-gray-500">To</p>
            <p className="text-lg font-semibold text-gray-900">{flight.to}</p>
            <p className="text-sm text-gray-600">{flight.arrival}</p>
          </div>
        </div>

        {flight.airline && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Airline:</span> {flight.airline}
            </p>
          </div>
        )}

        {flight.duration && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Duration:</span> {flight.duration}
          </div>
        )}
      </div>
    </div>
  );
}
