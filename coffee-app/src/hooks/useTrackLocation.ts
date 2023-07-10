import {useState} from "react";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");

  const onSuccess = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMsg("");
  };

  const onError = (positionError: GeolocationPositionError) => {
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  return {
    latLong,
    handleTrackLocation,
    locationErrorMsg,
  };
};

export default useTrackLocation;
