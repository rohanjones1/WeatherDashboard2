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

// TODO: Implement a real weather API integration.
// Once connected, this endpoint should return JSON in the shape:
// { city, temperature, condition, humidity, windSpeed, forecast: [{ day, high, low, condition }] }
app.get("/api/weather", (req: Request, res: Response) => {
  const city = req.query.city as string | undefined;

  if (!city) {
    res.status(400).json({ error: "Missing required query parameter: city" });
    return;
  }

  // TODO: Replace this stub with a call to a real weather API.
  res.status(501).json({
    error: "No weather provider configured. Integrate a weather API to enable this endpoint.",
  });
});

app.listen(PORT, () => {
  console.log(`Weather Dashboard running at http://localhost:${PORT}`);
});
