# Weather App ⛅

A modern, responsive weather application built with React and Vite, featuring real-time weather data, location services, and a beautiful user interface with dynamic backgrounds.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🌤️ Weather Information

- **Real-time Weather Data**: Get current weather conditions and 5-day forecast
- **Current Weather**: Temperature, humidity, wind speed, and weather conditions
- **5-Day Forecast**: Extended weather forecast with daily min/max temperatures
- **Weather Icons**: Dynamic weather icons from OpenWeather API

### 📍 Location Services

- **City Search**: Search for any city worldwide with auto-suggestions
- **Current Location**: Use geolocation to get weather for your current position
- **Recent Cities**: Smart history of recently searched locations (up to 8 items)
- **Favorite Locations**: Pin/unpin your favorite cities for quick access

### 🎨 User Experience

- **Dark/Light Mode**: Toggle with system preference detection
- **Units Switch**: Choose between Metric (°C, m/s) and Imperial (°F, mph)
- **Weather-based Backgrounds**: Dynamic gradient backgrounds that change with weather
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Loading states and smooth transitions

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0
- **Build Tool**: Vite 6.0.5
- **State Management**: TanStack Query (React Query) v5.62.7
- **Styling**: Tailwind CSS v3.4.17
- **API**: OpenWeather API
- **Storage**: Local Storage for user preferences
- **Code Quality**: ESLint

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- OpenWeather API key (free at [openweathermap.org](https://openweathermap.org/api))

## 🚀 Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd WeatherApp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the root directory:

   ```env
   VITE_OPENWEATHER_KEY=your_api_key_here
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
WeatherApp/
├── src/
│   ├── api/
│   │   └── openWeather.js      # API integration
│   ├── components/
│   │   ├── ErrorBox.jsx        # Error handling
│   │   ├── ForecastStrip.jsx   # 5-day forecast
│   │   ├── MyLocationButton.jsx # Geolocation button
│   │   ├── RecentCities.jsx    # Recent searches
│   │   ├── SearchBox.jsx       # City search
│   │   ├── ThemeToggle.jsx     # Dark/Light toggle
│   │   ├── UnitsToggle.jsx     # Metric/Imperial toggle
│   │   └── WeatherCard.jsx     # Current weather
│   ├── hooks/
│   │   ├── useCitySearch.js    # City search logic
│   │   ├── useCurrentWeather.js # Weather data
│   │   ├── useForecast.js      # Forecast data
│   │   ├── useLocalStorage.js  # Storage management
│   │   └── useTheme.js         # Theme management
│   └── pages/
│       └── Home.jsx            # Main page
├── .env                        # Environment variables
└── package.json               # Dependencies
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 API Integration

Uses OpenWeather API for:

- **Geocoding**: Convert city names to coordinates
- **Current Weather**: Real-time weather data
- **5-Day Forecast**: Extended weather predictions
- **Reverse Geocoding**: Convert coordinates to city names

## ⚡ Performance Features

- **Smart Caching**: 1-minute cache for weather data, 5-minute for city suggestions
- **Debounced Search**: 300ms debounce for search input
- **Query Deduplication**: Prevents duplicate API calls
- **Optimized Re-renders**: Efficient state management with React Query

## 🎯 Key Features in Detail

### Weather Data

- Current temperature, humidity, wind speed
- Weather description and icons
- 5-day forecast with min/max temperatures
- Weather-appropriate dynamic backgrounds

### User Preferences

- Dark/Light mode with system preference detection
- Temperature units (Celsius/Fahrenheit)
- Recent searches history management
- Pinned favorite locations with persistence

### Location Features

- City search with real-time suggestions
- Current location detection via geolocation
- Recent locations management
- Favorite locations pinning system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenWeather API](https://openweathermap.org/) for weather data
- [TailwindCSS](https://tailwindcss.com/) for styling utilities
- [TanStack Query](https://tanstack.com/query) for data fetching
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool

---

**Made with ❤️ and React**
