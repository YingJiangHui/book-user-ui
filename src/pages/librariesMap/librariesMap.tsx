import React, { memo } from "react";
import { CustomAMap } from "@/components/CustomAMap/CustomAMap";
import {useRequest} from "ahooks";
import {getLibraries} from "@/service/library";

type props = {};
export type LibrariesMapProps = props;
export const LibrariesMap: React.FC<
  React.PropsWithChildren<LibrariesMapProps>
> = memo((props) => {
  return (
    <>
      <CustomAMap />
    </>
  );
});
LibrariesMap.displayName = "图书馆地图";

export default LibrariesMap;
