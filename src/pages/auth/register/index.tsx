import React, { memo } from "react";

type props = {};
export type RegisterPageProps = props;
export const RegisterPage: React.FC<React.PropsWithChildren<RegisterPageProps>> =
  memo((props) => {
    return <>注册页面</>;
  });

export default RegisterPage
RegisterPage.displayName = "注册页面";
