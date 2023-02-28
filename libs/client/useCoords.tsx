import { useEffect, useState } from "react";

interface useCoordsProps {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<useCoordsProps>({
    latitude: null,
    longitude: null,
  });
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude: latitude, longitude: longitude });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
}

//chat gpt가 짠거
// import { useState, useEffect } from 'react';

// const useUserLocation = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const successHandler = (position) => {
//       const { latitude, longitude } = position.coords;
//       setLocation({ latitude, longitude });
//     };

//     const errorHandler = (err) => {
//       setError(err.message);
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   return { location, error };
// };

// export default useUserLocation;
