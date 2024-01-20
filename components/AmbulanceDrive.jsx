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
  const [userLocation, setUserLocation] = useState([22.56068526876014, 88.41255734683494]); // Default location

  const hospitalLocations = {
    'hospital1': [22.5638664, 88.3302269],
    'hospital2': [22.5593912, 88.3698572],
    'hospital3': [22.5724048, 88.3715853],
    'hospital4': [22.568117, 88.3702897]
  };

  // Get user's current location
  /*useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);*/

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView(userLocation, 11);
      const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet © ' + mapLink + ', contribution',
        maxZoom: 18
      }).addTo(map);

      const taxiIcon = L.icon({
        iconUrl: 'taxi.png',
        iconSize: [70, 70]
      });

      // Create an array to store the markers
      const markers = [];

      // Add a marker for each hospital location
      Object.values(hospitalLocations).forEach((location, index) => {
        const marker = L.marker(location, { icon: taxiIcon }).addTo(map);
        marker.bindPopup(`Ambulance ${index + 1}`);

        // Store the marker in the array
        markers.push(marker);
      });

      // Add a marker for the user's location
      const userMarker = L.marker(userLocation).addTo(map);

      // Get the hospital ID from the user (this will need to be implemented)
      const hospitalId = 'hospital1'; // Default hospital

      // Get the coordinates for the selected hospital
      const hospitalCoords = hospitalLocations[hospitalId];

      // Get the marker for the selected hospital
      const hospitalMarker = markers.find(marker => marker.getLatLng().equals(hospitalCoords));

      // Animate the ambulance from the selected hospital
      const control = L.Routing.control({
        waypoints: [
          L.latLng(hospitalCoords[0], hospitalCoords[1]),
          L.latLng(userLocation[0], userLocation[1])
        ],
        routeWhileDragging: true,
        autoRoute: true,
        show: true,
      }).addTo(map);

      control.on('routesfound', function (e) {
        const routes = e.routes;
        const coords = routes[0].coordinates;
        let i = 0;

        // Calculate the total distance of the route in meters
        const totalDistance = routes[0].summary.totalDistance;

        // Convert the distance to kilometers
        const totalDistanceKm = totalDistance / 1000;

        // Display the time to the user
        function animateTaxi() {
          if (i < coords.length) {
            hospitalMarker.setLatLng(coords[i]);
            i++;
            setTimeout(animateTaxi, 1000);
          } else {
            map.removeControl(control);
            setIsAnimating(false);
          }
        }

        animateTaxi();
      });

      mapRef.current = map;
    }
  }, [userLocation]);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapComponent;
