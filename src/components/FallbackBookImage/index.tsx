import React, { memo } from "react";
import image404 from "@/assets/404.svg";
import { Image } from "antd-mobile";

type props = {};
export type FallbackBookImageProps = props;
export const FallbackBookImage: React.FC<
  React.PropsWithChildren<FallbackBookImageProps>
> = memo((props) => {
  return (
    <div
      style={{
        width: 50,
        height: 73,
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={image404} width={30} />
    </div>
  );
});
FallbackBookImage.displayName = "图书封面保底图片";
