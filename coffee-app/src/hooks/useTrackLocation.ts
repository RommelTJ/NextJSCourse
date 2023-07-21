import {useContext, useState} from "react";

import { ACTION_TYPES, CoffeeContext } from "@/app/coffee-provider";


const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const { state, dispatch } = useContext(CoffeeContext);
  const latLng = state.latLng;

  const onSuccess = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    dispatch({ type: ACTION_TYPES.SET_LAT_LNG, payload: `${latitude},${longitude}`})
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  const onError = (positionError: GeolocationPositionError) => {
    setLocationErrorMsg("Unable to retrieve your location");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  return {
    latLng,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation
  };
};

export default useTrackLocation;
