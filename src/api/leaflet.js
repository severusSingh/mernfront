import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const isMapCreated = mapId => {
  const mapEl = document.getElementById(mapId);
  return mapEl.innerHTML !== '';
};

export const showMap = mapId => {
  if (isMapCreated(mapId)) return;

  const map = L.map(mapId).setView([51.505, -0.09], 8);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    updateWhenZooming: false,
    maxZoom: 18,
    minZoom: 4,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  return map;
};

export const setMarker = (map, coordinates, title) => {
  const customMarkerIcon = L.icon({
    iconUrl: require('./pin.png'),
    iconSize: [22, 32], // Adjust the size of your marker icon
    iconAnchor: [12, 41], // Adjust the anchor point of your marker icon
  });

  const marker = L.marker(coordinates, { icon: customMarkerIcon }).addTo(map);

  const popupContent = `
  <div class="custom-popup">
    <p style="font-size: 1.4rem;">Day ${title.day}: ${title.description}</p>
  </div>
`;
  const popup = L.popup().setLatLng(coordinates).setContent(popupContent);
  marker.bindPopup(popup);
};

