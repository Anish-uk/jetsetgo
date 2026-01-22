const axios = require("axios");

let accessToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  // Reuse token if still valid
  if (accessToken && tokenExpiry > Date.now()) {
    return accessToken;
  }

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.AMADEUS_API_KEY);
  params.append("client_secret", process.env.AMADEUS_API_SECRET);

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    params,
  );

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;

  return accessToken;
}

async function amadeusRequest(url, params = {}) {
  const token = await getAccessToken();

  const response = await axios.get(`https://test.api.amadeus.com${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
}

module.exports = { amadeusRequest };
