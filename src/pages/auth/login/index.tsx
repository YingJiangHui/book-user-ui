import React, { memo } from "react";

type props = {};
export type LoginPageProps = props;
export const LoginPage: React.FC<React.PropsWithChildren<LoginPageProps>> =
  memo((props) => {
    return <>登录页面</>;
  });

export default LoginPage
LoginPage.displayName = "登录页面";
