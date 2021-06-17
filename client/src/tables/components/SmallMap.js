import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import geoJson from "geojson";

const style = {
  width: "100%",
  height: "30vh",
  marginBottom: "1.5rem",
};

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});

function SmallMap(props) {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 38.897957,
    lng: -77.03656,
  });

  const [geojsonValue, setGeojsonValue] = useState(null);

  // create map
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = L.map("mapId", {
      center: [markerPosition.lat, markerPosition.lng],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
    mapRef.current.on("click", function (e) {
      setMarkerPosition(e.latlng);

      let data = { name: "location", lat: e.layerPoint.x, lng: e.layerPoint.y };
      setGeojsonValue(geoJson.parse(data, {Point: ['lat', 'lng'], include: ['name']}));
    });
  }, []);

  // add marker
  const markerRef = useRef(null);
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(markerPosition);
    } else {
      markerRef.current = L.marker(markerPosition, { icon: DefaultIcon }).addTo(
        mapRef.current
      );
    }
  }, [markerPosition]);

  useEffect(() => {
    if (geojsonValue) props.input.onChange(geojsonValue);
    if (geojsonValue) console.log("geojsonValue", geojsonValue);
    if (!geojsonValue) console.log('something wrong');
  }, [geojsonValue]);

  return (
    <div>
      <p>{props.label}</p>
      <div name={props.name} id="mapId" style={style}></div>
    </div>
  );
}

export default SmallMap;
