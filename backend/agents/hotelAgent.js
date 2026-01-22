const axios = require("axios");

const client = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com/api/v1",
});

client.interceptors.request.use((config) => {
  config.headers["x-rapidapi-key"] = process.env.RAPIDAPI_KEY;
  config.headers["x-rapidapi-host"] = process.env.RAPIDAPI_HOST;
  return config;
});

function getFutureDate(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split("T")[0];
}

// Generate mock hotels based on destination
function getMockHotels(city) {
  const hotelBrands = [
    { prefix: "Grand", suffix: "Hotel" },
    { prefix: "The", suffix: "Resort & Spa" },
    { prefix: "Luxury", suffix: "Suites" },
    { prefix: "Royal", suffix: "Palace" },
    { prefix: "Boutique", suffix: "Inn" },
  ];

  return hotelBrands.map((brand, i) => ({
    id: `hotel-${i + 1}`,
    name: `${brand.prefix} ${city} ${brand.suffix}`,
    location: `${city} City Center`,
    rating: 4.2 + i * 0.15,
    reviewCount: 500 + i * 200,
    price: 80 + i * 30 + Math.floor(Math.random() * 20),
    pricePerNight: 80 + i * 30 + Math.floor(Math.random() * 20),
    currency: "EUR",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym"].slice(
      0,
      3 + (i % 3),
    ),
    images: [],
  }));
}

module.exports = async (state) => {
  console.log("🏨 Hotel Agent running");

  const city = state.destination || "Paris";
  const tripDays = state.tripDays || 5;

  console.log(`📍 Searching hotels in: ${city}`);
  console.log(`📅 Trip duration: ${tripDays} days`);

  try {
    // 1️⃣ Search destination to get dest_id
    const destRes = await client.get("/hotels/searchDestination", {
      params: { query: city },
    });

    const destinations = destRes.data?.data || [];
    if (!destinations.length) {
      console.log("⚠️ No destination found, using mock hotels");
      return { ...state, hotels: getMockHotels(city) };
    }

    // Pick the first city-type result
    const cityData =
      destinations.find((d) => d.search_type === "city") || destinations[0];

    if (!cityData) {
      console.log("⚠️ No city-type destination found, using mock hotels");
      return { ...state, hotels: getMockHotels(city) };
    }

    const dest_id = cityData.dest_id;

    // Use dynamic dates based on trip duration
    const arrivalDate = getFutureDate(30);
    const departureDate = getFutureDate(30 + tripDays);

    // 2️⃣ Search hotels using dest_id
    const hotelsRes = await client.get("/hotels/searchHotels", {
      params: {
        dest_id,
        search_type: "CITY",
        arrival_date: arrivalDate,
        departure_date: departureDate,
        adults: state.adults || 1,
        room_qty: state.room_qty || 1,
        page_number: 1,
        units: "metric",
        languagecode: "en-us",
        currency_code: "EUR",
      },
    });

    const hotelsData = hotelsRes.data?.data?.hotels || [];

    if (hotelsData.length === 0) {
      console.log("⚠️ No hotels returned from API, using mock data");
      return { ...state, hotels: getMockHotels(city) };
    }

    const hotels = hotelsData.slice(0, 6).map((h) => ({
      id: h.hotel_id || h.property?.id,
      name:
        h.property?.name ||
        h.accessibilityLabel?.split("\n")[0] ||
        "Unknown Hotel",
      location: city,
      rating: h.property?.reviewScore || 4.0,
      reviewCount: h.property?.reviewCount || 0,
      price: Math.round(h.property?.priceBreakdown?.grossPrice?.value || 100),
      pricePerNight: Math.round(
        (h.property?.priceBreakdown?.grossPrice?.value || 100) / tripDays,
      ),
      currency: h.property?.priceBreakdown?.grossPrice?.currency || "EUR",
      amenities: ["WiFi", "Breakfast", "Pool"].slice(
        0,
        Math.floor(Math.random() * 3) + 1,
      ),
      images: h.property?.photoUrls || [],
    }));

    console.log("✅ Hotels found:", hotels.length);
    return { ...state, hotels };
  } catch (err) {
    console.error("⚠️ Hotel API error, using mock data:", err.message);
    return { ...state, hotels: getMockHotels(city) };
  }
};
