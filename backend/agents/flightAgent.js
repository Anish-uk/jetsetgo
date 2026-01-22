const { amadeusRequest } = require("../tools/amadeusClient");

// City to IATA code mapping
const cityToIATA = {
  paris: "CDG",
  tokyo: "NRT",
  london: "LHR",
  "new york": "JFK",
  dubai: "DXB",
  singapore: "SIN",
  bangkok: "BKK",
  rome: "FCO",
  barcelona: "BCN",
  amsterdam: "AMS",
  berlin: "BER",
  mumbai: "BOM",
  delhi: "DEL",
  sydney: "SYD",
  "los angeles": "LAX",
  bali: "DPS",
  istanbul: "IST",
  seoul: "ICN",
  "hong kong": "HKG",
  milan: "MXP",
  vienna: "VIE",
  prague: "PRG",
  lisbon: "LIS",
  madrid: "MAD",
  maldives: "MLE",
  cairo: "CAI",
  athens: "ATH",
  zurich: "ZRH",
  switzerland: "ZRH",
  geneva: "GVA",
  moscow: "SVO",
  toronto: "YYZ",
  vancouver: "YVR",
  "cape town": "CPT",
  rio: "GIG",
  "mexico city": "MEX",
  santorini: "JTR",
  greece: "ATH",
  japan: "NRT",
  france: "CDG",
  italy: "FCO",
  spain: "MAD",
  australia: "SYD",
  india: "DEL",
  thailand: "BKK",
};

function extractTripDetails(prompt) {
  const lower = prompt.toLowerCase();

  // Extract city
  let city = "paris";
  let code = "CDG";
  for (const [cityName, iataCode] of Object.entries(cityToIATA)) {
    if (lower.includes(cityName)) {
      city = cityName;
      code = iataCode;
      break;
    }
  }

  // Extract days
  let days = 5; // default
  const daysMatch = lower.match(/(\d+)\s*(days?|nights?)/);
  if (daysMatch) {
    days = parseInt(daysMatch[1], 10);
  }

  // Extract budget - look for dollar amounts or budget mentions
  let budget = 2000; // default in USD
  // Match patterns like: $2000, 2000 dollars, budget of 2000, 2000 budget
  const budgetPatterns = [
    /\$\s*(\d{1,6})/, // $2000
    /(\d{1,6})\s*(?:dollars?|usd)/i, // 2000 dollars
    /budget\s*(?:of|is|:)?\s*\$?\s*(\d{1,6})/i, // budget of 2000
    /(\d{1,6})\s*budget/i, // 2000 budget
    /with\s*\$?\s*(\d{1,6})/i, // with 2000 or with $2000
  ];

  for (const pattern of budgetPatterns) {
    const match = lower.match(pattern);
    if (match) {
      const parsed = parseInt(match[1].replace(/,/g, ""), 10);
      if (parsed >= 100) {
        // Ignore very small numbers (like "3 days")
        budget = parsed;
        break;
      }
    }
  }

  return { city, code, days, budget };
}

function getFutureDate(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split("T")[0];
}

module.exports = async (state) => {
  console.log("✈️ Flight Agent running");

  const { city, code, days, budget } = extractTripDetails(state.input || "");
  const departureDate = getFutureDate(30);
  const returnDate = getFutureDate(30 + days);

  // Store extracted info in state for other agents
  state.destination = city.charAt(0).toUpperCase() + city.slice(1);
  state.destinationCode = code;
  state.tripDays = days;
  state.tripBudget = budget;

  console.log(`📍 Destination: ${state.destination} (${code})`);
  console.log(`📅 Duration: ${days} days`);
  console.log(`💰 Budget: $${budget}`);

  // Use mock flights directly to avoid API issues
  // The Amadeus test API has rate limits and internal errors
  const flights = getMockFlights(code, state.destination, departureDate);

  return {
    ...state,
    flights,
  };
};

function getMockFlights(destCode = "CDG", destCity = "Paris", departureDate) {
  const depDate = departureDate || getFutureDate(30);
  const airlines = [
    { code: "LH", name: "Lufthansa" },
    { code: "BA", name: "British Airways" },
    { code: "AF", name: "Air France" },
    { code: "EK", name: "Emirates" },
    { code: "AI", name: "Air India" },
  ];

  return airlines.slice(0, 4).map((airline, i) => ({
    from: "BOM",
    to: destCode,
    departure: `${depDate}T${String(6 + i * 4).padStart(2, "0")}:00:00`,
    arrival: `${depDate}T${String(14 + i * 4).padStart(2, "0")}:30:00`,
    price: 350 + i * 80 + Math.floor(Math.random() * 50),
    airline: airline.name,
    airlineCode: airline.code,
    duration: `PT${8 + Math.floor(i / 2)}H${30 + ((i * 15) % 60)}M`,
  }));
}
