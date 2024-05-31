import { useGeolocation } from "@/hooks/useGeolocation";
import { isWithinRange } from "@/utils/utils";
import { useMemo } from "react";

export const useUserLocationInRange = (
  lat?: number,
  lon?: number,
  range?: number
) => {
  const { location, error } = useGeolocation([]);

  return useMemo(
    () => ({
      isInRange: isWithinRange(
        location?.coords.latitude,
        location?.coords.longitude,
        range,
        lat,
        lon
      ),
      inRange: (lat?: number, lon?: number, range?: number) =>
        isWithinRange(
          location?.coords.latitude,
          location?.coords.longitude,
          range,
          lat,
          lon
        ),
      location,
      error,
    }),
    [location, error, lat, lon, range]
  );
};
