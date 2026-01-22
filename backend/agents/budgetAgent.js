const { convertEURtoINR } = require("../tools/currency");

module.exports = async (state) => {
  console.log("💰 Budget Agent running");

  // Use extracted budget from prompt, convert USD to INR (approx 83 INR per USD)
  const budgetUSD = state.tripBudget || 2000;
  const budgetINR = budgetUSD * 83;
  const nights = state.tripDays || 5;

  console.log(`💵 User budget: $${budgetUSD} (~₹${budgetINR})`);
  console.log(`🌙 Trip duration: ${nights} nights`);

  // Flights - get cheapest
  const flightPricesEUR = state.flights?.map((f) => f.price) || [];
  const cheapestFlightEUR = flightPricesEUR.length
    ? Math.min(...flightPricesEUR)
    : 0;
  const flightCostINR = convertEURtoINR(cheapestFlightEUR);

  // Hotels - get cheapest per night
  const hotelPricesPerNight =
    state.hotels?.map((h) => h.pricePerNight || h.price || 0) || [];
  const cheapestHotelPerNightEUR = hotelPricesPerNight.length
    ? Math.min(...hotelPricesPerNight)
    : 0;
  const hotelCostINR = convertEURtoINR(cheapestHotelPerNightEUR * nights);

  const totalCost = flightCostINR + hotelCostINR;
  const remaining = budgetINR - totalCost;
  const exceeded = remaining < 0;

  let warning = "";
  if (remaining < 0) {
    warning =
      "Trip exceeds budget. Consider cheaper options or a shorter stay.";
  } else if (remaining < budgetINR * 0.1) {
    warning = "Budget is tight. Consider flexible dates for better prices.";
  }

  return {
    ...state,
    budget: {
      total: Math.round(budgetINR),
      flights: Math.round(flightCostINR),
      hotels: Math.round(hotelCostINR),
      remaining: Math.round(remaining),
      exceeded,
      warning,
      currency: "INR",
    },
  };
};
