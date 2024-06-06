import { useEffect, useState } from "react";

export const useGeolocation = (deps: React.DependencyList) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      const error = new GeolocationPositionError();
      setError(error);
      return;
    }
    const watcher = geo.watchPosition((a) => {
      console.log(a, "a00");
      setLocation(a);
    }, setError);
    console.log("watcher", watcher);
    return () => geo.clearWatch(watcher);
  }, deps);
  console.log(location, "location");
  return { location, error };
};
