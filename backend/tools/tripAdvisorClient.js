const axios = require("axios");

const client = axios.create({
  baseURL: "https://tripadvisor16.p.rapidapi.com/api/v1",
});

client.interceptors.request.use((config) => {
  config.headers["x-rapidapi-key"] = process.env.RAPIDAPI_KEY;
  config.headers["x-rapidapi-host"] = process.env.RAPIDAPI_HOST;
  return config;
});

// 1️⃣ Search location → get locationId + lat/lng
async function searchLocation(query) {
  const res = await client.get("/hotels/searchLocation", {
    params: { query },
  });

  return res.data?.data || [];
}

// 2️⃣ Search hotels using lat/lng
async function searchHotelsByLocation(lat, lng) {
  const res = await client.get("/hotels/searchHotelsByLocation", {
    params: {
      latitude: lat,
      longitude: lng,
      pageNumber: 1,
      currencyCode: "USD",
    },
  });

  return res.data?.data || [];
}

module.exports = {
  searchLocation,
  searchHotelsByLocation,
};
