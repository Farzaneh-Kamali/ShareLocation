import React, { useEffect, useState } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  const onSuccess = (location: {
    coords: { latitude: any; longitude: any };
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return location;
};

export default useGeoLocation;
