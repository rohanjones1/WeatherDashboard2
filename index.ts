import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve the dashboard page
app.get("/", (_req: Request, res: Response) => {
  res.render("index");
});

// TODO: Replace this mock endpoint with a real weather API.
// The response shape should stay the same so the frontend keeps working.
app.get("/api/weather", (req: Request, res: Response) => {
  const city = req.query.city as string | undefined;

  if (!city) {
    res.status(400).json({ error: "Missing required query parameter: city" });
    return;
  }

  // TODO: Replace this hardcoded mock data with live data from a weather API.
  const mockWeather = {
    city: city,
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 58,
    windSpeed: 12,
    forecast: [
      { day: "Mon", high: 24, low: 16, condition: "Sunny" },
      { day: "Tue", high: 21, low: 14, condition: "Cloudy" },
      { day: "Wed", high: 19, low: 13, condition: "Rain" },
      { day: "Thu", high: 23, low: 15, condition: "Partly Cloudy" },
      { day: "Fri", high: 25, low: 17, condition: "Sunny" },
    ],
  };

  res.json(mockWeather);
});

app.listen(PORT, () => {
  console.log(`Weather Dashboard running at http://localhost:${PORT}`);
});
