const express = require("express");
const cors = require("cors");
const appGraph = require("./graph");
const { generateAIItinerary } = require("./agents/itineraryAgent");

require("dotenv").config();

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
    : ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Trust proxy for production deployments (Vercel, Railway, etc.)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "JetSetGo backend running 🚀",
    environment: process.env.NODE_ENV || "development",
  });
});

app.post("/api/plan", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await appGraph.invoke({
      input: prompt,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Planning failed" });
  }
});

/**
 * Phase 5: AI Itinerary Generator Endpoint
 * Generates detailed day-by-day travel itinerary using Google Gemini
 */
app.post("/api/itinerary", async (req, res) => {
  try {
    const { city, start_date, end_date, preferences } = req.body;

    // Validate required fields
    if (!city || !start_date || !end_date) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["city", "start_date", "end_date"],
      });
    }

    // Validate date format and logic
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        error: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    if (endDate < startDate) {
      return res.status(400).json({
        error: "End date must be after start date",
      });
    }

    console.log(
      `🗺️ Generating itinerary for ${city} (${start_date} to ${end_date})`,
    );

    // Generate itinerary using Gemini AI
    const itinerary = await generateAIItinerary({
      city,
      start_date,
      end_date,
      preferences: preferences || [],
    });

    res.json({
      success: true,
      data: itinerary,
    });
  } catch (err) {
    console.error("❌ Itinerary endpoint error:", err);
    res.status(500).json({
      error: "Failed to generate itinerary",
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`),
);
