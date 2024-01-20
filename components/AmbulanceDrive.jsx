import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

let L;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  require('leaflet-routing-machine');
}
const MapComponent = () => {
  const mapRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([22.56068526876014, 88.41255734683494], 11);
      const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet © ' + mapLink + ', contribution',
        maxZoom: 18
      }).addTo(map);

      const taxiIcon = L.icon({
        iconUrl: 'taxi.png',
        iconSize: [70, 70]
      });
      const ambulanceLocations = [
        [22.5638664, 88.3302269],
        [22.5593912, 88.3698572],
        [22.5724048, 88.3715853]
      ];

      // Create an array to store the markers
      const markers = [];

      // Add a marker for each ambulance location
      ambulanceLocations.forEach((location, index) => {
        const marker = L.marker(location, { icon: taxiIcon }).addTo(map);
        marker.bindPopup(`Ambulance ${index + 1}`);

        // Store the marker in the array
        markers.push(marker);
      });

      map.on('click', function (e) {
        if (!isAnimating) {
          setIsAnimating(true);}
          const userMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

          let shortestDistance = Infinity;
          let closestAmbulanceIndex;

          // Calculate the distance from the user point to each ambulance location
          ambulanceLocations.forEach((location, index) => {
            const distance = map.distance(location, [e.latlng.lat, e.latlng.lng]);

            if (distance < shortestDistance) {
              shortestDistance = distance;
              closestAmbulanceIndex = index;
            }
          });

          // Get the marker for the closest ambulance
          const closestMarker = markers[closestAmbulanceIndex];

          // Animate the closest ambulance
          const control = L.Routing.control({
            waypoints: [
              L.latLng(ambulanceLocations[closestAmbulanceIndex][0], ambulanceLocations[closestAmbulanceIndex][1]),
              L.latLng(e.latlng.lat, e.latlng.lng)
            ],
            routeWhileDragging: true,
            autoRoute: true,
            show: false,
          }).addTo(map);

          control.on('routesfound', function (e) {
            const routes = e.routes;
            const coords = routes[0].coordinates;
            let i = 0;

            function animateTaxi() {
              if (i < coords.length) {
                closestMarker.setLatLng(coords[i]);
                i++;
                setTimeout(animateTaxi, 100);
              } else {
                map.removeControl(control);
                setIsAnimating(false);
              }
            }

            animateTaxi();
          });
        });

      mapRef.current = map;
    }
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapComponent;
