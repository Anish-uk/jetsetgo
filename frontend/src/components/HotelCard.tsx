import { Hotel } from "@/types";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            🏨 {hotel.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">📍 {hotel.location}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">${hotel.price}</p>
          <p className="text-xs text-gray-500">per night</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center">
          <span className="text-yellow-400 text-lg">★</span>
          <span className="ml-1 text-sm font-medium text-gray-900">
            {hotel.rating.toFixed(1)}
          </span>
        </div>

        {hotel.distance && (
          <div className="text-sm text-gray-600">📏 {hotel.distance}</div>
        )}
      </div>

      {hotel.amenities && hotel.amenities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">Amenities:</p>
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 4).map((amenity, index) => (
              <span
                key={`${amenity}-${index}`}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
