const { StateGraph } = require("@langchain/langgraph");

const flightAgent = require("./agents/flightAgent");
const hotelAgent = require("./agents/hotelAgent");
const budgetAgent = require("./agents/budgetAgent");
const itineraryAgent = require("./agents/itineraryAgent");
const uiAgent = require("./agents/uiAgent");

const graph = new StateGraph({
  channels: {
    input: {},
    destination: {},
    destinationCode: {},
    tripDays: {},
    tripBudget: {},
    flights: {},
    hotels: {},
    budget: {},
    itinerary: {},
    ui: {},
  },
});

graph.addNode("flightAgent", flightAgent);
graph.addNode("hotelAgent", hotelAgent);
graph.addNode("budgetAgent", budgetAgent);
graph.addNode("itineraryAgent", itineraryAgent);
graph.addNode("uiAgent", uiAgent);

graph.setEntryPoint("flightAgent");

graph.addEdge("flightAgent", "hotelAgent");
graph.addEdge("hotelAgent", "budgetAgent");
graph.addEdge("budgetAgent", "itineraryAgent");
graph.addEdge("itineraryAgent", "uiAgent");

const app = graph.compile();

module.exports = app;
