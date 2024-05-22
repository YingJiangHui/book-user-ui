import React, { memo } from "react";

type props = {};
export type MyPageProps = props;
export const MyPage: React.FC<React.PropsWithChildren<MyPageProps>> = memo(props => {

  return <>我的</>;
});
MyPage.displayName = "我的";
export default MyPage
