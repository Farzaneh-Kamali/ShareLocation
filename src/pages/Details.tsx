import { stat } from 'fs';
import { icon } from 'leaflet';
import React, { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button/Button';

export const Details = () => {
  const location = useLocation();
  //@ts-ignore
  const [name, lat, lng, type, logo] = [
    //@ts-ignore
    location?.state?.name,
    //@ts-ignore
    location?.state?.lat,
    //@ts-ignore
    location?.state?.lng,
    //@ts-ignore
    location?.state?.type,
    //@ts-ignore
    location?.state?.logo,
  ];

  const myIcon = logo
    ? new (icon as any)({
        //@ts-ignore
        iconUrl: URL.createObjectURL(logo),
        iconSize: [25, 25],
      })
    : new (icon as any)({
        //@ts-ignore
        iconUrl: require('../images/marker.png'),
        iconSize: [25, 25],
      });

  const [map, setMap] = useState(null);
  const popupRef = useRef(null);
  const closePopups = () => {
    if (!popupRef.current || !map) return; //@ts-ignore
    popupRef.current._close();
  };
  const navigate = useNavigate();
  const editInfo = () => {
    navigate('/');
  };
  return (
    <MapContainer //@ts-ignore
      whenCreated={setMap}
      center={[Number(lat), Number(lng)]}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[Number(lat), Number(lng)]} icon={myIcon}>
        <Popup closeButton={false} ref={popupRef}>
          {name}
          <br />
          {lat}, {lng}
          <br />
          {type}
          <div>
            <Button type="button" gruop="Close" size="M" on_Click={closePopups}>
              Close
            </Button>
            <Button type="button" gruop="SaveEdit" size="M" on_Click={editInfo}>
              Edit
            </Button>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
