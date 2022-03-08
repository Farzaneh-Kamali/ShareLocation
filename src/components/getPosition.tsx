import React from 'react';

export function success(position: {
  coords: { latitude: any; longitude: any };
}) {
  return position.coords.latitude, position.coords.longitude;
}

function error() {
  alert('Sorry, no position available.');
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

const watchID = navigator.geolocation.getCurrentPosition(
  success,
  error,
  options
);
