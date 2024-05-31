import React, { memo } from "react";

type props = {};
export type ManualProps = props;
export const Manual: React.FC<React.PropsWithChildren<ManualProps>> = memo(
  (props) => {
    return <>用户手册</>;
  }
);
Manual.displayName = "用户手册";

export default Manual;
