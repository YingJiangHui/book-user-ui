import { useLocalStorageState } from "ahooks";
import { getUserInfo } from "@/service/user";
import { useMemo, useState } from "react";
import { useRequest } from "@@/exports";
import { getLibraries } from "@/service/library";
import { useUserLocationInRange } from "@/hooks/useUserLocationInRange";

export default function CurrentLibrary() {
  const [selectedLibrary, setSelectedLibrary] =
    useLocalStorageState<API.Library.Instance>("selected-library", {
      serializer: (value) => (value ? JSON.stringify(value) : ""),
      deserializer: (value) => (value ? JSON.parse(value) : undefined),
    });

  const librariesReq = useRequest(getLibraries);

  const locationService = useUserLocationInRange();

  const library = useMemo(
    () =>
      librariesReq.data?.find((item) =>
        locationService.inRange(
          item.latitude,
          item.longitude,
          item.circumference
        )
      ),
    [locationService.location, librariesReq.data]
  );
  console.log("-222", locationService);

  return {
    librarySearcher: selectedLibrary ? selectedLibrary : library,
    librariesReq,
    library,
    locationService,
    setSelectedLibrary,
    selectedLibrary,
  };
}
