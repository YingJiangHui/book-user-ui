import React, { memo } from "react";
import { Image } from "antd-mobile";
import none from "@/assets/none.svg";
import classNames from "classnames";
import "./none.less";
type props = {
  desc?: React.ReactNode;
};
export type NoneProps = props;
export const None: React.FC<React.PropsWithChildren<NoneProps>> = memo(
  (props) => {
    const { desc = "暂无数据" } = props;
    return (
      <div className={classNames("none-container")}>
        <Image width={150} src={none}></Image>
        <p>{desc}</p>
      </div>
    );
  }
);
None.displayName = "暂无数据";
