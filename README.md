# JetSetGo ✈️

AI-powered travel planning platform that helps you discover destinations, plan itineraries, and book your perfect trip.

🌐 **Live Demo**: [https://jet-set-go-ai.vercel.app](https://jet-set-go-ai.vercel.app)

![JetSetGo](frontend/public/jetsetgo_logo.png)

## Features

- 🤖 **AI Trip Planning** - Natural language trip planning powered by Google Gemini
- ✈️ **Flight Search** - Search and compare flights from worldwide airlines
- 🏨 **Hotel Booking** - Find and book hotels, resorts, and unique stays
- 🗺️ **Smart Itineraries** - AI-generated day-by-day travel plans
- ❤️ **Wishlist** - Save your dream destinations for later
- 📅 **Trip Management** - Manage all your trips in one place
- 🎫 **Experience Booking** - Book tours, activities, and experiences

## Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful icons

### Backend

- **Node.js + Express** - REST API server
- **LangGraph** - AI agent orchestration
- **Google Gemini** - AI-powered itinerary generation
- **Amadeus API** - Flight data
- **TripAdvisor/RapidAPI** - Hotel data

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- API Keys (see Environment Variables)

### Environment Variables

#### Backend (`backend/.env`)

```env
# Amadeus API (https://developers.amadeus.com/)
AMADEUS_API_KEY=your_amadeus_api_key
AMADEUS_API_SECRET=your_amadeus_api_secret

# RapidAPI (https://rapidapi.com/)
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=booking-com15.p.rapidapi.com

# Google Gemini (https://aistudio.google.com/apikey)
GEMINI_API_KEY=your_gemini_api_key

# Server
PORT=5000
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000,https://jet-set-go-ai.vercel.app
```

#### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/jetsetgo.git
   cd jetsetgo
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your API keys
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   cp .env.example .env.local
   # Edit .env.local if needed
   npm install
   ```

4. **Start development servers**

   Backend (Terminal 1):

   ```bash
   cd backend
   npm run dev
   ```

   Frontend (Terminal 2):

   ```bash
   cd frontend
   npm run dev
   ```

5. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000)

## Deployment

### Frontend (Vercel)

✅ **Already Deployed**: [https://jet-set-go-ai.vercel.app](https://jet-set-go-ai.vercel.app)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = Your deployed backend URL
4. Deploy

### Backend (Railway/Render/Fly.io)

1. Push your code to GitHub
2. Create new project on [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io)
3. Add environment variables:
   - `AMADEUS_API_KEY`
   - `AMADEUS_API_SECRET`
   - `RAPIDAPI_KEY`
   - `RAPIDAPI_HOST`
   - `GEMINI_API_KEY`
   - `PORT` (usually auto-set)
   - `NODE_ENV=production`
   - `CORS_ORIGINS` = Your frontend URL (e.g., `https://jet-set-go-ai.vercel.app`)
4. Deploy

## Project Structure

```
jetsetgo/
├── backend/
│   ├── agents/           # AI agents (flight, hotel, itinerary, etc.)
│   ├── tools/            # API clients (Amadeus, TripAdvisor)
│   ├── graph.js          # LangGraph workflow
│   ├── server.js         # Express server
│   └── package.json
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   ├── components/   # React components
│   │   └── types/        # TypeScript types
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint         | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| GET    | `/api/health`    | Health check                             |
| POST   | `/api/plan`      | Generate trip plan from natural language |
| POST   | `/api/itinerary` | Generate detailed itinerary              |

## Security Notes

⚠️ **Important**: Never commit `.env` files with real API keys!

- All API keys are stored in environment variables
- `.env` files are in `.gitignore`
- Use `.env.example` files as templates
- Rotate API keys if accidentally exposed

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

Built with ❤️ by the JetSetGo Team
