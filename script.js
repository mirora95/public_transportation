// This app uses mock data so beginners can understand the structure
// before connecting it to a real API.

const DEFAULT_CITY = {
  name: "Khujand",
  center: [40.2824, 69.6222],
  zoom: 12,
};

const routes = [
  {
    routeNumber: "12",
    start: "Panjshanbe Bazaar",
    end: "20th Microdistrict",
    path: [
      [40.2868, 69.6072],
      [40.2861, 69.6125],
      [40.2852, 69.6188],
      [40.2840, 69.6250],
      [40.2826, 69.6316],
      [40.2810, 69.6382],
      [40.2796, 69.6441],
      [40.2787, 69.6496],
    ],
    stops: [
      { name: "Panjshanbe Bazaar", lat: 40.2868, lng: 69.6072 },
      { name: "Khujand Central Mosque", lat: 40.2861, lng: 69.6125 },
      { name: "Somoni Avenue", lat: 40.2852, lng: 69.6188 },
      { name: "Kamoli Khujandi Park", lat: 40.2840, lng: 69.6250 },
      { name: "Khujand University", lat: 40.2810, lng: 69.6382 },
      { name: "20th Microdistrict", lat: 40.2787, lng: 69.6496 },
    ],
  },
  {
    routeNumber: "24",
    start: "Khujand Airport",
    end: "Chkalovsk",
    path: [
      [40.2288, 69.6948],
      [40.2384, 69.6854],
      [40.2478, 69.6730],
      [40.2579, 69.6609],
      [40.2668, 69.6498],
      [40.2740, 69.6390],
      [40.2812, 69.6306],
    ],
    stops: [
      { name: "Khujand Airport", lat: 40.2288, lng: 69.6948 },
      { name: "Airport Road", lat: 40.2384, lng: 69.6854 },
      { name: "Amoni Clinic", lat: 40.2478, lng: 69.6730 },
      { name: "Syrdarya Riverside", lat: 40.2579, lng: 69.6609 },
      { name: "Ismoili Somoni Street", lat: 40.2668, lng: 69.6498 },
      { name: "Chkalovsk", lat: 40.2812, lng: 69.6306 },
    ],
  },
  {
    routeNumber: "45",
    start: "Khujand Fortress",
    end: "Gafurov",
    path: [
      [40.2891, 69.6162],
      [40.2872, 69.6214],
      [40.2856, 69.6273],
      [40.2839, 69.6338],
      [40.2821, 69.6402],
      [40.2805, 69.6471],
      [40.2784, 69.6543],
    ],
    stops: [
      { name: "Khujand Fortress", lat: 40.2891, lng: 69.6162 },
      { name: "Central Stadium", lat: 40.2872, lng: 69.6214 },
      { name: "Somoni Park", lat: 40.2856, lng: 69.6273 },
      { name: "Sharq Market", lat: 40.2839, lng: 69.6338 },
      { name: "State University", lat: 40.2805, lng: 69.6471 },
      { name: "Gafurov", lat: 40.2784, lng: 69.6543 },
    ],
  },
  {
    routeNumber: "81",
    start: "Syrdarya Embankment",
    end: "Navbahor District",
    path: [
      [40.2798, 69.6021],
      [40.2809, 69.6094],
      [40.2819, 69.6170],
      [40.2826, 69.6254],
      [40.2830, 69.6339],
      [40.2837, 69.6426],
      [40.2844, 69.6515],
    ],
    stops: [
      { name: "Syrdarya Embankment", lat: 40.2798, lng: 69.6021 },
      { name: "Panjshanbe Bridge", lat: 40.2809, lng: 69.6094 },
      { name: "City Hall", lat: 40.2819, lng: 69.6170 },
      { name: "Rudaki Avenue", lat: 40.2826, lng: 69.6254 },
      { name: "Youth Center", lat: 40.2837, lng: 69.6426 },
      { name: "Navbahor District", lat: 40.2844, lng: 69.6515 },
    ],
  },
];

const vehicleSeeds = [
  { id: "MB-1201", routeNumber: "12", progress: 0.08, speed: 32, direction: "North-East", status: "On time" },
  { id: "MB-1202", routeNumber: "12", progress: 0.44, speed: 28, direction: "East", status: "Delayed" },
  { id: "MB-2401", routeNumber: "24", progress: 0.12, speed: 30, direction: "South-East", status: "On time" },
  { id: "MB-2402", routeNumber: "24", progress: 0.61, speed: 25, direction: "East", status: "Delayed" },
  { id: "MB-4501", routeNumber: "45", progress: 0.22, speed: 35, direction: "East", status: "On time" },
  { id: "MB-4502", routeNumber: "45", progress: 0.73, speed: 29, direction: "North-East", status: "On time" },
  { id: "MB-8101", routeNumber: "81", progress: 0.18, speed: 27, direction: "North-East", status: "Delayed" },
  { id: "MB-8102", routeNumber: "81", progress: 0.55, speed: 33, direction: "North-East", status: "On time" },
];

const routeMap = Object.fromEntries(routes.map((route) => [route.routeNumber, route]));

const routeSelect = document.querySelector("#routeSelect");
const stopSearchInput = document.querySelector("#stopSearch");
const stopSearchButton = document.querySelector("#stopSearchButton");
const locateButton = document.querySelector("#locateButton");
const resetButton = document.querySelector("#resetButton");
const themeToggle = document.querySelector("#themeToggle");
const mapTitle = document.querySelector("#mapTitle");
const routeStart = document.querySelector("#routeStart");
const routeEnd = document.querySelector("#routeEnd");
const routeStops = document.querySelector("#routeStops");
const activeVehiclesCount = document.querySelector("#activeVehiclesCount");
const nearestVehiclesList = document.querySelector("#nearestVehiclesList");
const totalVehiclesCard = document.querySelector("#totalVehiclesCard");
const activeRoutesCard = document.querySelector("#activeRoutesCard");

const map = L.map("map", {
  zoomControl: true,
}).setView(DEFAULT_CITY.center, DEFAULT_CITY.zoom);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const routeLineLayers = new Map();
const stopLayers = [];
const vehicleMarkers = new Map();

let selectedRoute = "all";
let userMarker = null;
let userCircle = null;
let userLocation = null;
let vehicles = buildVehicles();

populateRouteSelector();
createRouteLines();
createStopMarkers();
renderVehicles();
updateSidebar();
updateDashboard();

routeSelect.addEventListener("change", (event) => {
  selectedRoute = event.target.value;
  applyRouteFilter();
});

stopSearchButton.addEventListener("click", handleStopSearch);
stopSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleStopSearch();
  }
});

locateButton.addEventListener("click", locateUser);
resetButton.addEventListener("click", resetMapView);
themeToggle.addEventListener("click", toggleTheme);

setInterval(() => {
  updateVehiclePositions();
  renderVehicles();
  updateSidebar();
  updateDashboard();

  if (userLocation) {
    renderNearestVehicles();
  }
}, 4000);

function populateRouteSelector() {
  routes.forEach((route) => {
    const option = document.createElement("option");
    option.value = route.routeNumber;
    option.textContent = `Route ${route.routeNumber}`;
    routeSelect.appendChild(option);
  });
}

function buildVehicles() {
  return vehicleSeeds.map((seed) => {
    const position = getPointOnRoute(routeMap[seed.routeNumber].path, seed.progress);

    return {
      ...seed,
      lat: position.lat,
      lng: position.lng,
      nextStop: findNextStop(seed.routeNumber, seed.progress),
      lastUpdated: new Date(),
    };
  });
}

function createRouteLines() {
  routes.forEach((route) => {
    const polyline = L.polyline(route.path, {
      color: "#86a0b7",
      weight: 4,
      opacity: 0.45,
    }).addTo(map);

    routeLineLayers.set(route.routeNumber, polyline);
  });
}

function createStopMarkers() {
  routes.forEach((route) => {
    route.stops.forEach((stop) => {
      const marker = L.marker([stop.lat, stop.lng], {
        icon: L.divIcon({
          className: "",
          html: '<div class="stop-marker"></div>',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        }),
      })
        .bindPopup(`<strong>${stop.name}</strong><br>Route ${route.routeNumber} stop`)
        .addTo(map);

      stopLayers.push({
        marker,
        routeNumber: route.routeNumber,
        name: stop.name.toLowerCase(),
      });
    });
  });
}

function renderVehicles() {
  vehicles.forEach((vehicle) => {
    if (!vehicleMarkers.has(vehicle.id)) {
      const marker = L.marker([vehicle.lat, vehicle.lng], {
        icon: L.divIcon({
          className: "",
          html: '<div class="vehicle-marker"></div>',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        }),
      }).addTo(map);

      vehicleMarkers.set(vehicle.id, marker);
    }

    const marker = vehicleMarkers.get(vehicle.id);
    marker.setLatLng([vehicle.lat, vehicle.lng]);
    marker.bindPopup(buildVehiclePopup(vehicle));

    const isVisible = selectedRoute === "all" || vehicle.routeNumber === selectedRoute;
    toggleLayer(marker, isVisible);
  });

  applyRouteStyles();
  filterStopsByRoute();
}

function buildVehiclePopup(vehicle) {
  const lastUpdated = vehicle.lastUpdated.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const statusClass = vehicle.status === "Delayed" ? "delayed" : "on-time";

  return `
    <strong>Route ${vehicle.routeNumber}</strong><br>
    Vehicle ID: ${vehicle.id}<br>
    Speed: ${vehicle.speed} km/h<br>
    Direction: ${vehicle.direction}<br>
    Next stop: ${vehicle.nextStop}<br>
    Last updated: ${lastUpdated}<br>
    <span class="status-pill ${statusClass}">${vehicle.status}</span>
  `;
}

function updateVehiclePositions() {
  vehicles = vehicles.map((vehicle) => {
    const route = routeMap[vehicle.routeNumber];
    const progressStep = 0.035 + Math.random() * 0.02;
    const nextProgress = (vehicle.progress + progressStep) % 1;
    const nextPoint = getPointOnRoute(route.path, nextProgress);
    const nextStop = findNextStop(vehicle.routeNumber, nextProgress);

    return {
      ...vehicle,
      progress: nextProgress,
      lat: nextPoint.lat,
      lng: nextPoint.lng,
      nextStop,
      speed: randomBetween(22, 40),
      status: Math.random() > 0.72 ? "Delayed" : "On time",
      lastUpdated: new Date(),
    };
  });
}

function applyRouteFilter() {
  renderVehicles();
  updateSidebar();

  if (userLocation) {
    renderNearestVehicles();
  }

  if (selectedRoute === "all") {
    mapTitle.textContent = "All routes currently visible";
    return;
  }

  const route = routeMap[selectedRoute];
  mapTitle.textContent = `Route ${route.routeNumber}: ${route.start} to ${route.end}`;
  map.fitBounds(route.path, { padding: [40, 40] });
}

function applyRouteStyles() {
  routeLineLayers.forEach((polyline, routeNumber) => {
    const isActiveRoute = selectedRoute === routeNumber;
    const isShowingAll = selectedRoute === "all";

    polyline.setStyle({
      color: isActiveRoute ? "#0e8f6a" : "#86a0b7",
      weight: isActiveRoute ? 6 : 4,
      opacity: isShowingAll || isActiveRoute ? 0.85 : 0.12,
    });
  });
}

function filterStopsByRoute() {
  stopLayers.forEach((stopLayer) => {
    const isVisible = selectedRoute === "all" || stopLayer.routeNumber === selectedRoute;
    toggleLayer(stopLayer.marker, isVisible);
  });
}

function updateSidebar() {
  if (selectedRoute === "all") {
    routeStart.textContent = "All route starting points";
    routeEnd.textContent = "All route destinations";
    routeStops.textContent = String(routes.reduce((sum, route) => sum + route.stops.length, 0));
  } else {
    const route = routeMap[selectedRoute];
    routeStart.textContent = route.start;
    routeEnd.textContent = route.end;
    routeStops.textContent = String(route.stops.length);
  }

  const activeVehicleTotal = vehicles.filter((vehicle) => {
    return selectedRoute === "all" || vehicle.routeNumber === selectedRoute;
  }).length;

  activeVehiclesCount.textContent = String(activeVehicleTotal);
}

function updateDashboard() {
  totalVehiclesCard.textContent = String(vehicles.length);
  activeRoutesCard.textContent = String(routes.length);
}

function locateUser() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported in this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      renderUserLocation();
      renderNearestVehicles();
      map.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 1.4 });
    },
    () => {
      alert("Unable to get your location. Please allow location access and try again.");
    }
  );
}

function renderUserLocation() {
  const latLng = [userLocation.lat, userLocation.lng];

  if (!userMarker) {
    userMarker = L.marker(latLng, {
      icon: L.divIcon({
        className: "",
        html: '<div class="user-location-marker"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    }).addTo(map);
  } else {
    userMarker.setLatLng(latLng);
  }

  if (!userCircle) {
    userCircle = L.circle(latLng, {
      radius: 220,
      color: "#2563eb",
      fillColor: "#2563eb",
      fillOpacity: 0.12,
    }).addTo(map);
  } else {
    userCircle.setLatLng(latLng);
  }

  userMarker.bindPopup("You are here").openPopup();
}

function renderNearestVehicles() {
  const visibleVehicles = vehicles.filter((vehicle) => {
    return selectedRoute === "all" || vehicle.routeNumber === selectedRoute;
  });

  const nearest = visibleVehicles
    .map((vehicle) => ({
      ...vehicle,
      distance: getDistanceInKm(userLocation, { lat: vehicle.lat, lng: vehicle.lng }),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  if (nearest.length === 0) {
    nearestVehiclesList.innerHTML = "<li>No vehicles available for the selected route.</li>";
    return;
  }

  nearestVehiclesList.innerHTML = nearest
    .map((vehicle) => {
      return `
        <li>
          <span class="nearest-route">Route ${vehicle.routeNumber} - ${vehicle.id}</span>
          <span class="nearest-distance">${vehicle.distance.toFixed(2)} km away - ${vehicle.nextStop}</span>
        </li>
      `;
    })
    .join("");
}

function handleStopSearch() {
  const query = stopSearchInput.value.trim().toLowerCase();

  if (!query) {
    return;
  }

  const match = stopLayers.find((stopLayer) => {
    const routeMatches = selectedRoute === "all" || stopLayer.routeNumber === selectedRoute;
    return routeMatches && stopLayer.name.includes(query);
  });

  if (!match) {
    alert("No stop found for that search.");
    return;
  }

  const stopPosition = match.marker.getLatLng();
  map.flyTo(stopPosition, 15, { duration: 1.2 });
  match.marker.openPopup();
}

function resetMapView() {
  selectedRoute = "all";
  routeSelect.value = "all";
  mapTitle.textContent = "All routes currently visible";
  map.setView(DEFAULT_CITY.center, DEFAULT_CITY.zoom);
  renderVehicles();
  updateSidebar();

  if (userLocation) {
    renderNearestVehicles();
  } else {
    nearestVehiclesList.innerHTML = "<li>Share your location to see nearby microbuses.</li>";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "Light mode" : "Dark mode";
}

function getPointOnRoute(path, progress) {
  const segmentCount = path.length - 1;
  const scaledProgress = progress * segmentCount;
  const segmentIndex = Math.min(Math.floor(scaledProgress), segmentCount - 1);
  const segmentProgress = scaledProgress - segmentIndex;
  const start = path[segmentIndex];
  const end = path[segmentIndex + 1];

  return {
    lat: start[0] + (end[0] - start[0]) * segmentProgress,
    lng: start[1] + (end[1] - start[1]) * segmentProgress,
  };
}

function findNextStop(routeNumber, progress) {
  const route = routeMap[routeNumber];
  const stopIndex = Math.min(Math.floor(progress * route.stops.length) + 1, route.stops.length - 1);
  return route.stops[stopIndex].name;
}

function getDistanceInKm(pointA, pointB) {
  const earthRadius = 6371;
  const dLat = degreesToRadians(pointB.lat - pointA.lat);
  const dLng = degreesToRadians(pointB.lng - pointA.lng);
  const lat1 = degreesToRadians(pointA.lat);
  const lat2 = degreesToRadians(pointB.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

function degreesToRadians(value) {
  return value * (Math.PI / 180);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggleLayer(layer, shouldShow) {
  const isOnMap = map.hasLayer(layer);

  if (shouldShow && !isOnMap) {
    layer.addTo(map);
  }

  if (!shouldShow && isOnMap) {
    map.removeLayer(layer);
  }
}
