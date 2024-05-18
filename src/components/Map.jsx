// import React, { useEffect, useRef } from 'react';
// import L from 'leaflet';

// const TourMap = ({ locations }) => {
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     const map = L.map(mapContainerRef.current).setView(
//       [locations[0].coordinates[1], locations[0].coordinates[0]], // Leaflet uses [lat, lng] instead of [lng, lat]
//       10
//     );

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//       maxZoom: 18,
//     }).addTo(map);

//     // Add markers for each location
//     locations.forEach((location) => {
//       L.marker([location.coordinates[1], location.coordinates[0]])
//         .addTo(map)
//         .bindPopup(`<h3>${location.description}</h3>`);
//     });

//     // Clean up
//     return () => map.remove();
//   }, [locations]);

//   return <div ref={mapContainerRef} id='map' style={{ height: '400px' }} />;
// };

// export default TourMap;


import { useEffect } from 'react';
import { setMarker, showMap } from '../api/leaflet';

const init = (locationData, mapId) => {
  // Create a map
  const map = showMap(mapId);

  if (!map) return;

  // Adding location markers to map
  locationData.forEach(location => {
    setMarker(map, location.coordinates.reverse(), location);
  });

  // Focusing location of all tours using the polygon created by all location points
  const destinationLocations = locationData.map(location => location.coordinates);
  map.fitBounds(destinationLocations, { padding: [140, 140] });
};

const TourMap = ({ locationData, mapId }) => {
  useEffect(() => init(locationData, mapId), [locationData, mapId]);

  return <div id={mapId}></div>;
};

export default TourMap;