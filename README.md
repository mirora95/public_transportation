# Microbus Tracker

A beginner-friendly public transport tracking web app built with pure HTML, CSS, and JavaScript.

This project shows a live-style map interface for microbuses in Khujand, Tajikistan using mock data. Users can view routes, track moving vehicles, search stops, check route details, and find the nearest vehicles to their location.

## Live Demo

Add your live demo link here:

`[Live Demo](https://mirora95.github.io/public_transportation/)`

## Features

- Interactive map built with Leaflet.js
- Default city set to Khujand, Tajikistan
- Mock microbus vehicles shown as moving markers
- Route selector to filter vehicles by route number
- Route lines displayed with polylines
- Bus stop markers with stop name popups
- Sidebar with route details and active vehicle count
- "Locate Me" button using browser geolocation
- Nearest vehicles list based on user location
- Automatic vehicle updates every few seconds
- Dark mode toggle
- Stop search feature
- Status labels such as `On time` and `Delayed`
- Responsive layout for desktop and mobile

## Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)
- Leaflet.js
- OpenStreetMap tiles

## Project Structure

```text
index.html
style.css
script.js
README.md
```

## How To Run Locally

1. Download or clone the project.
2. Open `index.html` in your browser.
3. Make sure you have internet access so Leaflet and map tiles can load.

## How It Works

The application uses mock route, stop, and vehicle data stored directly in `script.js`.

- Each route contains:
  - route number
  - start point
  - end point
  - path coordinates
  - stop list
- Each vehicle contains:
  - vehicle ID
  - route number
  - speed
  - direction
  - status
  - current simulated position

Vehicle positions are updated automatically on a timer to simulate live movement.

## Future Improvements

- Connect to a real transport API
- Add real-time backend updates with WebSocket or polling
- Show estimated arrival time for each stop
- Add route search by name or number
- Add multilingual support
- Improve marker animation further

