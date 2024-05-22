import React, { memo } from "react";

type props = {};
export type ShelfPageProps = props;
export const ShelfPage: React.FC<React.PropsWithChildren<ShelfPageProps>> =
  memo((props) => {
    return <>我的书架</>;
  });
ShelfPage.displayName = "我的书架";
export default ShelfPage;
