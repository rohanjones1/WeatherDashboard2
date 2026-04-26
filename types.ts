/** Type definitions for the OpenWeatherMap integration. */

export interface CurrentWeatherResponse {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: { speed: number; deg: number };
  clouds: { all: number };
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number };
  dt_txt: string;
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: { name: string; country: string };
}

export interface DailyForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
}

export interface WeatherResult {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: DailyForecast[];
}
