// Type definitions for the JetSetGo application

export interface TripRequest {
  prompt: string;
}

export interface Flight {
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  airline?: string;
  duration?: string;
}

export interface Hotel {
  name: string;
  location: string;
  rating: number;
  price: number;
  distance?: string;
  amenities?: string[];
}

export interface BudgetInfo {
  total: number;
  flights: number;
  hotels: number;
  remaining: number;
  exceeded?: boolean;
  warning?: string;
}

export interface Activity {
  time: string;
  activity_name: string;
  location: string;
  description?: string;
}

export interface DayItinerary {
  day_number: number;
  date: string;
  activities: Activity[];
  notes?: string;
}

export interface ItineraryData {
  city: string;
  start_date: string;
  end_date: string;
  days: DayItinerary[];
}

export interface TripPlan {
  input: string;
  flights: Flight[];
  hotels: Hotel[];
  budget: BudgetInfo;
  itinerary: DayItinerary[];
  ui?: {
    summary?: string;
    cards?: unknown[];
  };
}
