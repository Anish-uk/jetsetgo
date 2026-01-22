module.exports = async (state) => {
  console.log("🎨 UI Agent running");

  return {
    components: [
      { type: "FlightCards", data: state.flights },
      { type: "HotelCards", data: state.hotels },
      { type: "BudgetSummary", data: state.budget },
      { type: "ItineraryTimeline", data: state.itinerary },
    ],
  };
};
