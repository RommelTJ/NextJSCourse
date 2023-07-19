import {useState} from "react";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLng, setLatLng] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  // TODO: Set Context

  const onSuccess = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLng(`${latitude},${longitude}`);
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
      // status.textContent = "Locating…";
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
