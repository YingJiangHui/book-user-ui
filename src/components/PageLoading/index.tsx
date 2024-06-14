import React, { memo } from "react";
import { Skeleton } from "antd-mobile";

type props = {
  maxHeight?: number;
};
export type PageLoadingProps = props;
export const PageLoading: React.FC<React.PropsWithChildren<PageLoadingProps>> =
  memo((props) => {
    return (
      <div
        style={{ padding: 8, maxHeight: props.maxHeight, overflow: "hidden" }}
      >
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
        <br />
        <Skeleton.Paragraph lineCount={5} animated />
        <br />
        <Skeleton.Paragraph lineCount={5} animated />
      </div>
    );
  });
PageLoading.displayName = "页面加载";
