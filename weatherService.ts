import axios from "axios";
import {
  CurrentWeatherResponse,
  ForecastResponse,
  ForecastItem,
  WeatherResult,
} from "./types";

const BASE_URL = "http://api.openweathermap.org/data/2.5";

/**
 * Fetch current weather conditions and a 5-day forecast for a given city
 * using the OpenWeatherMap free-tier API.
 */
export async function getWeather(
  city: string,
  apiKey: string
): Promise<WeatherResult> {
  const [currentRes, forecastRes] = await Promise.all([
    axios.get<CurrentWeatherResponse>(`${BASE_URL}/weather`, {
      params: { q: city, appid: apiKey, units: "metric" },
    }),
    axios.get<ForecastResponse>(`${BASE_URL}/forecast`, {
      params: { q: city, appid: apiKey, units: "metric", cnt: 40 },
    }),
  ]);

  const current = currentRes.data;

  // Extract one entry per day from the 3-hour forecast list (every 8th item)
  const dailyItems: ForecastItem[] = forecastRes.data.list
    .filter((_: ForecastItem, i: number) => i % 8 === 0)
    .slice(0, 5);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const forecast = dailyItems.map((item) => {
    const date = new Date(item.dt * 1000);
    return {
      day: dayNames[date.getDay()],
      high: Math.round(item.main.temp_max),
      low: Math.round(item.main.temp_min),
      condition: item.weather[0]?.description ?? "N/A",
    };
  });

  return {
    city: current.name,
    temperature: Math.round(current.main.temp),
    condition: current.weather[0]?.description ?? "N/A",
    humidity: current.main.humidity,
    windSpeed: Math.round(current.wind.speed * 3.6), // m/s -> km/h
    forecast,
  };
}
