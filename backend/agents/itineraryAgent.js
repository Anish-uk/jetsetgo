const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Generates AI-powered daily itinerary using Google Gemini
 * @param {Object} state - Graph state containing trip details
 * @returns {Object} Updated state with generated itinerary
 */
module.exports = async (state) => {
  console.log("🗺️ Itinerary Agent running");

  try {
    const destination = state.destination || "Paris";
    const tripDays = state.tripDays || 5;

    console.log(`📍 Generating itinerary for: ${destination}`);
    console.log(`📅 Duration: ${tripDays} days`);

    // Generate dynamic itinerary based on trip days
    const itinerary = generateDynamicItinerary(destination, tripDays);

    return {
      ...state,
      itinerary,
    };
  } catch (error) {
    console.error("❌ Itinerary Agent Error:", error.message);
    return {
      ...state,
      itinerary: [
        {
          day_number: 1,
          date: new Date().toISOString().split("T")[0],
          activities: [
            {
              time: "09:00",
              activity_name: "Unable to generate itinerary",
              location: "N/A",
              description: "Please try again",
            },
          ],
          notes: "Error generating itinerary",
        },
      ],
    };
  }
};

function getFutureDate(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split("T")[0];
}

// Activity templates for different day types
const activityTemplates = {
  arrival: (dest) => [
    {
      time: "09:00",
      activity_name: "Arrival & Check-in",
      location: `${dest} Airport`,
      description: "Arrive and transfer to hotel",
    },
    {
      time: "12:00",
      activity_name: "Lunch at Local Restaurant",
      location: `${dest} City Center`,
      description: "Experience local cuisine",
    },
    {
      time: "15:00",
      activity_name: "City Walking Tour",
      location: `${dest} Old Town`,
      description: "Explore the historic district",
    },
    {
      time: "19:00",
      activity_name: "Welcome Dinner",
      location: `${dest} Restaurant District`,
      description: "Fine dining experience",
    },
  ],
  exploration: (dest, dayNum) => [
    {
      time: "09:00",
      activity_name: "Breakfast at Hotel",
      location: "Hotel",
      description: "Start the day with a hearty breakfast",
    },
    {
      time: "10:00",
      activity_name:
        dayNum === 2 ? "Visit Main Attractions" : "Hidden Gems Tour",
      location: `${dest} Landmarks`,
      description: "Explore must-see attractions",
    },
    {
      time: "13:00",
      activity_name: "Lunch Break",
      location: `${dest} Local Cafe`,
      description: "Relax with local food",
    },
    {
      time: "15:00",
      activity_name: dayNum === 2 ? "Museum Visit" : "Cultural Experience",
      location: `${dest} Museum`,
      description: "Discover local history and art",
    },
    {
      time: "19:00",
      activity_name: "Dinner & Nightlife",
      location: `${dest} Entertainment District`,
      description: "Evening dining and entertainment",
    },
  ],
  adventure: (dest) => [
    {
      time: "08:00",
      activity_name: "Early Morning Adventure",
      location: `${dest} Outskirts`,
      description: "Outdoor activities",
    },
    {
      time: "12:00",
      activity_name: "Scenic Lunch",
      location: `${dest} Countryside`,
      description: "Lunch with a view",
    },
    {
      time: "14:00",
      activity_name: "Nature Exploration",
      location: `${dest} Natural Park`,
      description: "Connect with nature",
    },
    {
      time: "18:00",
      activity_name: "Sunset Experience",
      location: `${dest} Viewpoint`,
      description: "Watch the sunset",
    },
  ],
  shopping: (dest) => [
    {
      time: "09:00",
      activity_name: "Morning Market Visit",
      location: `${dest} Local Market`,
      description: "Experience local culture",
    },
    {
      time: "11:00",
      activity_name: "Shopping & Souvenirs",
      location: `${dest} Shopping District`,
      description: "Find unique local items",
    },
    {
      time: "13:00",
      activity_name: "Lunch",
      location: `${dest} Food Court`,
      description: "Try street food specialties",
    },
    {
      time: "15:00",
      activity_name: "Spa & Relaxation",
      location: `${dest} Spa`,
      description: "Unwind and relax",
    },
    {
      time: "19:00",
      activity_name: "Farewell Dinner",
      location: `${dest} Fine Dining`,
      description: "Special farewell meal",
    },
  ],
  departure: (dest) => [
    {
      time: "08:00",
      activity_name: "Early Breakfast",
      location: "Hotel",
      description: "Quick breakfast before departure",
    },
    {
      time: "10:00",
      activity_name: "Final Sightseeing",
      location: `${dest} City`,
      description: "Last minute exploration",
    },
    {
      time: "12:00",
      activity_name: "Checkout & Transfer",
      location: `${dest} Airport`,
      description: "Head to airport for departure",
    },
  ],
};

function generateDynamicItinerary(destination, tripDays) {
  const itinerary = [];

  for (let day = 1; day <= tripDays; day++) {
    let activities;
    let notes;

    if (day === 1) {
      activities = activityTemplates.arrival(destination);
      notes = "Take it easy on the first day to recover from travel";
    } else if (day === tripDays) {
      activities = activityTemplates.departure(destination);
      notes = "Don't forget to collect any stored luggage. Safe travels!";
    } else if (day === 2) {
      activities = activityTemplates.exploration(destination, 2);
      notes = "Book museum tickets in advance";
    } else if (day % 3 === 0) {
      activities = activityTemplates.adventure(destination);
      notes = "Great day for outdoor activities - check the weather!";
    } else if (day === tripDays - 1) {
      activities = activityTemplates.shopping(destination);
      notes = "Last full day - perfect for shopping and relaxation";
    } else {
      activities = activityTemplates.exploration(destination, day);
      notes = "Explore at your own pace";
    }

    itinerary.push({
      day_number: day,
      date: getFutureDate(29 + day),
      activities,
      notes,
    });
  }

  return itinerary;
}

/**
 * Generates detailed AI itinerary using Google Gemini
 * Called directly from /api/itinerary endpoint
 */
async function generateAIItinerary({
  city,
  start_date,
  end_date,
  preferences = [],
}) {
  try {
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    // Calculate number of days
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // Build detailed prompt for Gemini
    const prompt = buildItineraryPrompt({
      city,
      start_date,
      end_date,
      days,
      preferences,
    });

    console.log("📤 Sending prompt to Gemini...");

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("📥 Received response from Gemini");

    // Parse and validate JSON response
    const itinerary = parseAndValidateItinerary(text, {
      city,
      start_date,
      end_date,
      days,
    });

    return itinerary;
  } catch (error) {
    console.error("❌ AI Itinerary Generation Error:", error.message);
    throw error;
  }
}

/**
 * Builds a detailed prompt for Gemini to generate itinerary
 */
function buildItineraryPrompt({
  city,
  start_date,
  end_date,
  days,
  preferences,
}) {
  const preferencesText =
    preferences.length > 0
      ? `The traveler is interested in: ${preferences.join(", ")}.`
      : "";

  return `You are a professional travel planner. Generate a detailed day-by-day itinerary for a trip to ${city} from ${start_date} to ${end_date} (${days} days).

${preferencesText}

IMPORTANT: You must respond with ONLY valid JSON, no additional text or markdown formatting.

The JSON structure must be:
{
  "city": "${city}",
  "start_date": "${start_date}",
  "end_date": "${end_date}",
  "days": [
    {
      "day_number": 1,
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "time": "HH:MM",
          "activity_name": "Activity name",
          "location": "Location name",
          "description": "Brief description"
        }
      ],
      "notes": "Any special notes for the day"
    }
  ]
}

Requirements:
- Include 3-5 activities per day with realistic timing
- Start activities around 9:00 AM, end around 8:00 PM
- Include breakfast, lunch, dinner suggestions
- Consider travel time between locations
- Include both popular attractions and local experiences
- Activities should match the provided preferences
- Use actual location names in ${city}
- Provide brief descriptions (1 sentence max)

Generate the complete itinerary now in valid JSON format only:`;
}

/**
 * Parses and validates the Gemini response
 */
function parseAndValidateItinerary(text, { city, start_date, end_date, days }) {
  try {
    // Remove markdown code blocks if present
    let cleanText = text.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/```\n?/g, "");
    }

    // Parse JSON
    const itinerary = JSON.parse(cleanText);

    // Validate required fields
    if (!itinerary.days || !Array.isArray(itinerary.days)) {
      throw new Error("Invalid itinerary structure: missing days array");
    }

    // Validate each day
    itinerary.days.forEach((day, index) => {
      if (!day.day_number || !day.date || !day.activities) {
        throw new Error(`Invalid day structure at day ${index + 1}`);
      }

      if (!Array.isArray(day.activities) || day.activities.length === 0) {
        throw new Error(`Day ${index + 1} has no activities`);
      }

      // Validate each activity
      day.activities.forEach((activity, actIndex) => {
        if (!activity.time || !activity.activity_name || !activity.location) {
          throw new Error(
            `Invalid activity at day ${index + 1}, activity ${actIndex + 1}`,
          );
        }
      });
    });

    // Ensure basic fields are set
    itinerary.city = itinerary.city || city;
    itinerary.start_date = itinerary.start_date || start_date;
    itinerary.end_date = itinerary.end_date || end_date;

    console.log(`✅ Validated itinerary with ${itinerary.days.length} days`);
    return itinerary;
  } catch (error) {
    console.error("❌ JSON Parsing Error:", error.message);
    console.error("Raw text:", text.substring(0, 500));

    // Return fallback itinerary
    return createFallbackItinerary({ city, start_date, end_date, days });
  }
}

/**
 * Creates a fallback itinerary if AI generation fails
 */
function createFallbackItinerary({ city, start_date, end_date, days }) {
  const fallbackDays = [];
  const startDate = new Date(start_date);

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split("T")[0];

    fallbackDays.push({
      day_number: i + 1,
      date: dateStr,
      activities: [
        {
          time: "09:00",
          activity_name: "Morning exploration",
          location: `${city} city center`,
          description: "Explore the main attractions",
        },
        {
          time: "13:00",
          activity_name: "Lunch",
          location: "Local restaurant",
          description: "Try local cuisine",
        },
        {
          time: "15:00",
          activity_name: "Afternoon activities",
          location: `${city} landmarks`,
          description: "Visit popular sites",
        },
      ],
      notes: "Flexible schedule - adjust based on preferences",
    });
  }

  return {
    city,
    start_date,
    end_date,
    days: fallbackDays,
    fallback: true,
  };
}

// Export both functions
module.exports.generateAIItinerary = generateAIItinerary;
