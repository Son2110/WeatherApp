# Weather App

A modern weather application built with React, featuring real-time weather updates, location-based weather, and a clean, responsive UI.

## Features

- **Real-time Weather Data**: Get current weather conditions and 5-day forecast
- **Location Based Weather**:
  - Search for any city worldwide
  - Use current location with geolocation
  - Recent locations history
- **Smart UI Features**:
  - Dark/Light mode toggle
  - Metric/Imperial units switch
  - Favorite locations (pin/unpin)
  - Recent searches history
  - Weather-based dynamic backgrounds
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API**: OpenWeather API
- **Others**:
  - Local Storage for persisting user preferences
  - Geolocation API for current location
  - ESLint for code quality

## Prerequisites

- Node.js (v18 or higher recommended)
- OpenWeather API key

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weatherapp
```

2. Install dependencies:
   npm install

3. Create .env file in the root directory:
   VITE_OPENWEATHER_KEY=your_api_key_here

4. Start the development server:
   npm run dev

## Features in Detail

- **Weather Data**

  - Current temperature, humidity, wind speed
  - Weather description and icons
  - 5-day forecast with min/max temperatures

- **User Preferences**

  - Dark/Light mode with system preference detection
  - Temperature units (Celsius/Fahrenheit)
  - Rec ent searches history (up to 8 items)
  - Pinned favorite locations

- **Location Features**
  - City search with suggestions
  - Current location detection
  - Recent locations management
  - Favorite locations pinning

## Acknowledgments

- OpenWeather API for weather data
- TailwindCSS for styling utilities
- React Query for data fetching
