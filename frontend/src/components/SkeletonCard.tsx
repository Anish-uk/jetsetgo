export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded w-24"></div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export function SkeletonTripCard() {
  return (
    <div className="bg-linear-to-br from-gray-300 to-gray-400 rounded-2xl shadow-xl p-8 animate-pulse">
      <div className="h-8 bg-gray-500/30 rounded w-2/3 mb-4"></div>
      <div className="h-4 bg-gray-500/30 rounded w-1/2 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/20 rounded-xl p-4">
            <div className="h-4 bg-gray-500/30 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-500/30 rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonDayCard() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-pulse">
      <div className="bg-gray-300 p-4">
        <div className="h-6 bg-gray-400 rounded w-24 mb-2"></div>
        <div className="h-4 bg-gray-400 rounded w-32"></div>
      </div>
      <div className="p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
