import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import { getWeather } from "./weatherService";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHERMAP_API_KEY ?? "";

// Configure EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve the dashboard page
app.get("/", (_req: Request, res: Response) => {
  res.render("index");
});

// Return current conditions + 5-day forecast for a city
app.get("/api/weather", async (req: Request, res: Response) => {
  const city = req.query.city as string | undefined;

  if (!city) {
    res.status(400).json({ error: "Missing required query parameter: city" });
    return;
  }

  if (!API_KEY) {
    res.status(500).json({ error: "OPENWEATHERMAP_API_KEY is not configured on the server." });
    return;
  }

  try {
    const data = await getWeather(city, API_KEY);
    res.json(data);
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "response" in err &&
      typeof (err as Record<string, unknown>).response === "object"
    ) {
      const axiosErr = err as { response: { status: number; data: { message?: string } } };
      const status = axiosErr.response.status;
      const message = axiosErr.response.data?.message ?? "Weather API request failed";
      res.status(status).json({ error: message });
      return;
    }
    res.status(500).json({ error: "An unexpected error occurred while fetching weather data." });
  }
});

app.listen(PORT, () => {
  console.log(`Weather Dashboard running at http://localhost:${PORT}`);
});
