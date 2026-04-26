# Weather Dashboard

A simple Express + TypeScript weather dashboard that displays current conditions and a 5-day forecast for any city.

## Overview

The server is scaffolded with a basic Express app that renders an EJS template and exposes a JSON API endpoint. **No weather data provider has been chosen yet** — the API currently returns hardcoded mock data for every query.

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the dev server with ts-node  |
| `npm run build` | Compile TypeScript to `dist/`      |
| `npm start`     | Run the compiled JS from `dist/`   |

## Project Structure

```
index.ts          – Express server & routes
views/index.ejs   – Frontend dashboard template
package.json      – Dependencies & scripts
tsconfig.json     – TypeScript configuration
```

## TODO

- [ ] Pick and integrate a real weather API
- [ ] Replace mock data in `/api/weather` with live data
- [ ] Add error handling for invalid city names
- [ ] Add loading states and better UI styling
