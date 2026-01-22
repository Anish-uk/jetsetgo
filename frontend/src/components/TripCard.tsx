import { TripPlan, BudgetInfo } from "@/types";

interface TripCardProps {
  trip: TripPlan;
}

export default function TripCard({ trip }: TripCardProps) {
  const budget: BudgetInfo = trip.budget;
  const destination =
    trip.itinerary?.[0]?.activities?.[0]?.location?.split(",").pop()?.trim() ||
    "Your destination";

  return (
    <div className="bg-linear-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">🌍 Trip to {destination}</h2>
          <p className="text-blue-100 text-lg">{trip.input}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-blue-100 mb-1">Total Budget</p>
          <p className="text-3xl font-bold">${budget.total}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-blue-100 mb-1">Flights</p>
          <p className="text-3xl font-bold">${budget.flights}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-blue-100 mb-1">Hotels</p>
          <p className="text-3xl font-bold">${budget.hotels}</p>
        </div>
      </div>

      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-100">Remaining Budget</span>
          <span
            className={`text-2xl font-bold ${
              budget.exceeded ? "text-red-300" : "text-green-300"
            }`}
          >
            ${Math.abs(budget.remaining)}
          </span>
        </div>

        {budget.exceeded && (
          <div className="mt-3 bg-red-500/20 border border-red-300/30 rounded-lg p-3">
            <p className="text-sm text-red-100">
              ⚠️ Budget exceeded by ${Math.abs(budget.remaining)}
            </p>
          </div>
        )}

        {budget.warning && !budget.exceeded && (
          <div className="mt-3 bg-yellow-500/20 border border-yellow-300/30 rounded-lg p-3">
            <p className="text-sm text-yellow-100">💡 {budget.warning}</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-blue-200">✈️ Flights:</span>
          <span className="font-semibold">{trip.flights?.length || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-200">🏨 Hotels:</span>
          <span className="font-semibold">{trip.hotels?.length || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-200">📅 Days:</span>
          <span className="font-semibold">{trip.itinerary?.length || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-200">🎯 Activities:</span>
          <span className="font-semibold">
            {trip.itinerary?.reduce(
              (sum, day) => sum + (day.activities?.length || 0),
              0,
            ) || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
