import React, { memo } from "react";
import image404 from "@/assets/404.svg";
import { Image } from "antd-mobile";

type props = {
  width?: number;
};
export type FallbackBookImageProps = props;
export const FallbackBookImage: React.FC<
  React.PropsWithChildren<FallbackBookImageProps>
> = memo((props) => {
  const { width = 80 } = props;
  return (
    <div
      style={{
        width: width,
        height: width * 1.46,
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={image404} height={width * 1.46} width={30} />
    </div>
  );
});
FallbackBookImage.displayName = "图书封面保底图片";
