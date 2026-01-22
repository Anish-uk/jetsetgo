export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-purple-600 border-t-transparent animate-spin-slow"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Planning your perfect trip...
        </h3>
        <p className="text-gray-600">
          Our AI is finding the best flights, hotels, and activities for you
        </p>
      </div>
    </div>
  );
}
